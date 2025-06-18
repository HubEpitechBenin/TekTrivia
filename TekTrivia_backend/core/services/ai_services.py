from openai import OpenAI
import os
import requests
import json
import PyPDF2
import json
import re
from django.db import transaction
from SimpleQuiz.models import SQuiz, Question, Answer
from SimpleQuiz.serializers import QuizCreateSerializer, QuestionSerializer, AnswerSerializer, QuizSerializer

from openai import OpenAI

class AIService:
    """
    Service for handling all AI-related functionality.
    """
    @staticmethod
    def read_plain_document(file_path):
        """
        Read a document from the given file path.

        Args:
            file_path (str): Path to the document file.

        Returns:
            str: Content of the document.
        """
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    @staticmethod
    def read_pdf_document(file_path):
        """
        Read a PDF document from the given file path.

        Args:
            file_path (str): Path to the PDF file.

        Returns:
            str: Content of the PDF document.
        """
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page in reader.pages:
                text += page.extract_text() or ''
            return text

    def read_document(self, file_path):
        """
        Read a document from the given file path, supporting both plain text and PDF formats.

        Args:
            file_path (str): Path to the document file.

        Returns:
            str: Content of the document.
        """
        if file_path.endswith('.pdf'):
            return self.read_pdf_document(file_path)
        else:
            return self.read_plain_document(file_path)

    @staticmethod
    def generate_prompt(
            document_text:str,
            num_questions:int=5,
            theme:str="general",
            difficulty:str="medium"
    ):
        """
        Generate a prompt for the AI model to create quiz questions based on a document.

        Returns:
            str: The generated prompt.
        """
        struct = """{
            "title": "Title of the quiz",
            "difficulty": "Difficulty of the quizz",
            
            "Body" : [
                 {
                    "Question": "question text",
                     "AnswerA": {
                         "answer": "answer text",
                         "is_correct":"True or False"
                     },
                     ...,
                
                    "AnswerD": {
                        "answer": "answer text",
                        "is_correct":"True or False"
                    }
                }
                ...
            ]
        }
        """
        return f"""
        Based on the following document, create {num_questions} quiz questions of {difficulty} difficulty.
        The theme of the quiz is {theme}.
        For each question, provide:
        - The question
        - 4 multiple choice options (A, B, C, D)
        - The correct answer
        - A brief explanation

        Document content:
        {document_text}

        Format as JSON with questions array using the following structure:
        {struct}
        
        """


    class OpenAIClient:
        openai_key = os.environ.get('OPENAI_API_KEY')
        client = OpenAI(api_key=openai_key)

        def __post_init__(self):
            if not self.openai_key:
                raise ValueError("OPENAI_API_KEY environment variable not set")
            if not self.client:
                raise ValueError("OpenAI client not initialized. Check your API key.")

        def generate_quiz(self, document_text:str, num_questions:int=5):

            prompt = AIService.generate_prompt(document_text, num_questions)
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant professor who creates quizzes based on documents."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.7
            )
            return response.choices[0].message.content


    class DeepSeekClient:
        deep_key = os.environ.get('DEEPSEEK_API_KEY')
        client = OpenAI(api_key=deep_key, base_url="https://api.deepseek.com")
        def __post_init__(self):
            if not self.deep_key:
                raise ValueError("DEEPSEEK_API_KEY environment variable not set")
            if not self.client:
                raise ValueError("DeepSeek client not initialized. Check your API key.")

        def generate_quiz(self, document_text:str, num_questions:int=5, theme:str="general", difficulty:str="medium"):
            url = "https://api.deepseek.com/v1/chat/completions"

            headers = {
                "Authorization": f"Bearer  {self.deep_key}",
                "Content-Type": "application/json"
            }

            prompt = f"""
            Based on the following document, create {num_questions} quiz questions of.
            For each question, provide:
            - The question
            - 4 multiple choice options (A, B, C, D)
            - The correct answer
            - A brief explanation
        
            Document content:
            {document_text}
        
            Format as JSON with questions array.
            """

            data = {
                "model": "deepseek-chat",  # or "deepseek-coder" for technical docs
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 2000,
                "temperature": 0.7
            }

            response = requests.post(url, headers=headers, json=data)
            return response.json()

    class OpenRouterClient:
        deep_key = os.environ.get('OPENROUTER_API_KEY')
        client = OpenAI(api_key=deep_key, base_url="https://openrouter.ai/api/v1/chat/completions")

        def __post_init__(self):
            if not self.deep_key:
                raise ValueError("DEEPSEEK_API_KEY environment variable not set")
            if not self.client:
                raise ValueError("DeepSeek client not initialized. Check your API key.")

        def generate_quiz(self, request_data):
            url = "https://openrouter.ai/api/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.deep_key}",
                "Content-Type": "application/json"
            }
            document_text = request_data.get("document_text")
            num_questions = request_data.get("num_questions")
            theme = request_data.get("theme")
            difficulty = request_data.get("difficulty")

            prompt = AIService.generate_prompt(
                document_text,
                num_questions,
                theme,
                difficulty
            )
            # prompt = f"""
            # Based on the following document, create {num_questions} quiz questions.
            # For each question, provide:
            # - The question
            # - 4 multiple choice options (A, B, C, D)
            # - The correct answer
            # - A brief explanation
            #
            # Document content:
            # {document_text}
            #
            # Format as JSON with questions array.
            # """

            data = {
                "model": "deepseek/deepseek-r1-0528:free",  # or "deepseek-coder" for technical docs
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                     }
                ],
            }
            response = requests.post(url, headers=headers, json=data)
            return response.json()




def parse_api_response_to_quiz_data(api_response):
    """
    Parse the API response to extract quiz data
    """
    try:
        # If the input is a string, parse it as JSON
        if isinstance(api_response, str):
            data = json.loads(api_response)
        else:
            data = api_response

        # Extract the content from the API response
        content = data['choices'][0]['message']['content']

        # Extract the JSON quiz data from the content
        json_match = re.search(r'```json\n(.*?)\n```', content, re.DOTALL)

        if json_match:
            quiz_json_str = json_match.group(1)
            quiz_data = json.loads(quiz_json_str)
            return quiz_data
        else:
            raise ValueError("No JSON quiz data found in content")

    except (KeyError, json.JSONDecodeError, IndexError) as e:
        raise ValueError(f"Error parsing quiz data: {e}")


def save_quiz_to_database(api_response):
    """
    Parse API response and save quiz data to Django models
    Returns the created quiz instance
    """
    quiz_data = parse_api_response_to_quiz_data(api_response)

    with transaction.atomic():
        # Create the quiz
        quiz = SQuiz.objects.create(
            title=quiz_data.get('title', 'Untitled Quiz'),
            difficulty=quiz_data.get('difficulty', 'medium')
        )

        # Process each question
        for question_item in quiz_data.get('Body', []):
            # Find the question text (key that starts with 'Question')
            question_text = None
            question_key = None

            for key, value in question_item.items():
                if key.startswith('Question'):
                    question_text = value
                    question_key = key
                    break

            if question_text:
                # Create the question
                question = Question.objects.create(
                    quiz=quiz,
                    text=question_text
                )

                # Create answers
                answer_keys = ['AnswerA', 'AnswerB', 'AnswerC', 'AnswerD']
                for answer_key in answer_keys:
                    if answer_key in question_item:
                        answer_data = question_item[answer_key]
                        Answer.objects.create(
                            question=question,
                            text=answer_data['answer'],
                            is_correct=answer_data['is_correct'].lower() == 'true'
                        )

    return quiz


def save_quiz_with_serializers(api_response):
    """
    Alternative approach using serializers for validation
    """
    quiz_data = parse_api_response_to_quiz_data(api_response)

    with transaction.atomic():
        # Create quiz using serializer
        quiz_serializer = QuizCreateSerializer(data={
            'title': quiz_data.get('title', 'Untitled Quiz'),
            'difficulty': quiz_data.get('difficulty', 'medium')
        })

        if quiz_serializer.is_valid():
            quiz = quiz_serializer.save()
        else:
            raise ValueError(f"Quiz validation failed: {quiz_serializer.errors}")

        # Process questions
        for question_item in quiz_data.get('Body', []):
            question_text = None

            for key, value in question_item.items():
                if key.startswith('Question'):
                    question_text = value
                    break

            if question_text:
                question = Question.objects.create(
                    quiz=quiz,
                    text=question_text
                )

                # Create answers
                answer_keys = ['AnswerA', 'AnswerB', 'AnswerC', 'AnswerD']
                for answer_key in answer_keys:
                    if answer_key in question_item:
                        answer_data = question_item[answer_key]

                        answer_serializer = AnswerSerializer(data={
                            'question': question.id,
                            'text': answer_data['answer'],
                            'is_correct': answer_data['is_correct'].lower() == 'true'
                        })

                        if answer_serializer.is_valid():
                            answer_serializer.save()
                        else:
                            raise ValueError(f"Answer validation failed: {answer_serializer.errors}")

    return quiz


def get_quiz_with_all_data(quiz_id):
    """
    Retrieve quiz with all related data using your serializer
    """
    try:
        quiz = SQuiz.objects.get(id=quiz_id)
        serializer = QuizSerializer(quiz)
        return serializer.data
    except SQuiz.DoesNotExist:
        return None


# Example usage in views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json


@csrf_exempt
@require_http_methods(["POST"])
def create_quiz_from_api_response(request):
    """
    View to handle quiz creation from API response
    """
    try:
        # Get the API response from request body
        api_response = json.loads(request.body)

        # Save to database
        quiz = save_quiz_to_database(api_response)

        # Return the created quiz data
        quiz_data = get_quiz_with_all_data(quiz.id)

        return JsonResponse({
            'success': True,
            'message': 'Quiz created successfully',
            'quiz': quiz_data
        })

    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)


# Example usage in a management command or script
def example_usage():
    """
    Example of how to use the functions
    """
    # Your API response data
    api_response = {
        'id': 'gen-1750130664-GX3GH5rMUR9pArAa4iwl',
        'choices': [{
            'message': {
                'content': '''```json
{
    "title": "15 Unbreakable Laws of Growth Quiz",
    "difficulty": "easy",
    "Body": [
        {
            "Question1": "According to the Law of Intentionality, what separates accidental achievers from on-purpose achievers?",
            "AnswerA": {
                "answer": "Natural talent",
                "is_correct": "False"
            },
            "AnswerB": {
                "answer": "Passive observation",
                "is_correct": "False"
            },
            "AnswerC": {
                "answer": "Deliberate mindset",
                "is_correct": "True"
            },
            "AnswerD": {
                "answer": "Financial resources",
                "is_correct": "False"
            }
        }
    ]
}
```'''
            }
        }]
    }

    try:
        # Save to database
        quiz = save_quiz_to_database(api_response)
        print(f"Quiz created with ID: {quiz.id}")

        # Retrieve and display
        quiz_data = get_quiz_with_all_data(quiz.id)
        print(f"Quiz data: {quiz_data}")

    except Exception as e:
        print(f"Error: {e}")


# Utility function to convert your existing quiz data format
def convert_to_django_format(quiz_data):
    """
    Convert parsed quiz data to Django-friendly format
    """
    django_quiz = {
        'title': quiz_data.get('title', 'Untitled Quiz'),
        'difficulty': quiz_data.get('difficulty', 'medium'),
        'questions': []
    }

    for question_item in quiz_data.get('Body', []):
        for key, value in question_item.items():
            if key.startswith('Question'):
                question = {
                    'text': value,
                    'answers': []
                }

                # Extract answers
                for answer_key in ['AnswerA', 'AnswerB', 'AnswerC', 'AnswerD']:
                    if answer_key in question_item:
                        answer_data = question_item[answer_key]
                        question['answers'].append({
                            'text': answer_data['answer'],
                            'is_correct': answer_data['is_correct'].lower() == 'true'
                        })

                django_quiz['questions'].append(question)

    return django_quiz