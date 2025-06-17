from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, views, status, response
from rest_framework.permissions import AllowAny

from core.services.ai_services import AIService

class QuizzViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling quizzes.
    """
    # Define your queryset and serializer_class here
    # queryset = Quiz.objects.all()
    # serializer_class = QuizSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Create a new quiz.
        """
        document_text = request.data.get('document_text', '')
        num_questions = request.data.get('num_questions', 5)

        if not document_text:
            return response.Response(
                {"error": "Document text is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # deep_ai = AIService().DeepSeekClient()
        # openai = AIService().OpenAIClient()
        router_ai = AIService().OpenRouterClient()
        # Generate quiz questions using AIService
        questions = router_ai.generate_quiz(
            document_text,
            num_questions
        )
        # questions = openai.generate_quiz(
        #     document_text,
        #     num_questions
        # )
        if not questions:
            return response.Response(
                {"error": "Failed to generate quiz questions"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return response.Response(
            {"message": "Quiz created successfully", "questions": questions},
            status=status.HTTP_201_CREATED
        )

    def list(self, request, *args, **kwargs):
        """
        List all quizzes.
        """
        return response.Response(
            {"message": "List of quizzes"},
            status=status.HTTP_200_OK
        )

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific quiz by ID.
        """
        return response.Response(
            {"message": f"Details of quiz {kwargs['pk']}"},
            status=status.HTTP_200_OK
        )