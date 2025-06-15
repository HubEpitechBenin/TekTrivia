from openai import OpenAI
import os
import requests
import json
import PyPDF2

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
    def generate_prompt(document_text:str, num_questions:int=5):
        """
        Generate a prompt for the AI model to create quiz questions based on a document.

        Returns:
            str: The generated prompt.
        """
        return f"""
        Based on the following document, create {num_questions} quiz questions.
        For each question, provide:
        - The question
        - 4 multiple choice options (A, B, C, D)
        - The correct answer
        - A brief explanation

        Document content:
        {document_text}

        Format as JSON with questions array.
        """


    class DeepSeekClient:
        deep_key = os.environ.get('DEEPSEEK_API_KEY')
        client = OpenAI(api_key=deep_key, base_url="https://api.deepseek.com")
        def __post_init__(self):
            if not self.deep_key:
                raise ValueError("DEEPSEEK_API_KEY environment variable not set")
            if not self.client:
                raise ValueError("DeepSeek client not initialized. Check your API key.")

        # def ask_deepseek(self, prompt):
        #     """"
        #     Ask a question to DeepSeek AI and get a response.
        #     Args:
        #         prompt (str): The question to ask.
        #     Returns:
        #         str: The response from DeepSeek AI.
        #     """
        #     if not self.client:
        #         raise ValueError("DeepSeek client not initialized. Check your API key.")
        #
        #     response = self.client.chat.completions.create(
        #         model="deepseek-chat",
        #         messages=[
        #             {"role": "system", "content": "You are a helpful assistant"},
        #             {"role": "user", "content": prompt},
        #       ],
        #         max_tokens=1024,
        #         temperature=0.7,
        #         stream=False
        #     )
        #     return response.choices[0].message.content

        #     print(response.choices[0].message.content)

        def generate_quiz(self, document_text:str, num_questions:int=5):
            url = "https://api.deepseek.com/v1/chat/completions"

            headers = {
                "Authorization": f"Bearer  {self.deep_key}",
                "Content-Type": "application/json"
            }

            prompt = f"""
            Based on the following document, create {num_questions} quiz questions.
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
