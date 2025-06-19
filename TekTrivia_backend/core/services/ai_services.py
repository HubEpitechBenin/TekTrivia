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

from core.services.document_service import DocumentService


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
            "title": "Title of the quiz. Must be an appropriate quiz title.",
            "difficulty": "Difficulty of the quizz",
            "description": "Simple description no longer than 500 characters"
            
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

        def generate_quiz(self, request_data, request_files):
            url = "https://openrouter.ai/api/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {self.deep_key}",
                "Content-Type": "application/json"
            }
            # document_text = request_data.get("document_text")
            document_text = DocumentService().receive_document(body=request_data, files=request_files)
            num_questions = request_data.get("num_questions")
            theme = request_data.get("theme")
            difficulty = request_data.get("difficulty")

            prompt = AIService.generate_prompt(
                document_text,
                num_questions,
                theme,
                difficulty
            )

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
