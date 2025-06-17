import json
import re

from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from core.services.ai_services import AIService, save_quiz_to_database, get_quiz_with_all_data
from .models import SCategory, SQuiz
from .serializers import QuizSerializer, QuizCreateSerializer
from .models import Question
from .serializers import QuestionSerializer
from rest_framework.views import APIView
from .models import Answer
from .serializers import AnswerSerializer
from .models import SCategory
from .serializers import CategorySerializer

class CategoryAPIView(APIView):
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            category = serializer.save()
            return Response(CategorySerializer(category).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuizAPIView(APIView):
    def get(self, request):
        quizzes = SQuiz.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuizCreateSerializer(data=request.data)
        if serializer.is_valid():
            quiz = serializer.save()
            return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionAPIView(APIView):
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.save()
            return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnswerAPIView(APIView):
    def post(self, request):
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            answer = serializer.save()
            return Response(AnswerSerializer(answer).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class QuizzGenerationView(APIView):
#     def post(self, request):
#         ai = AIService().OpenRouterClient()
#         generated_data = ai.generate_quiz(request_data=request.data)
#         generated_data = generated_data['choices'][0]['message']['content']
#         json_match = re.search(r'```json\n(.*?)\n```', generated_data, re.DOTALL)
#         quiz_json = json.loads(json_match.group(1))
#         print(quiz_json)
#         serializer = QuizCreateSerializer(data=generated_data)
#         serializer.is_valid(raise_exception=True)
#         quiz = serializer.save()
#         return Response(QuizSerializer(quiz).data, status=status.HTTP_201_CREATED)
# Create your views here.

class QuizzGenerationView(APIView):
    def post(self, request):
        ai = AIService().OpenRouterClient()
        ai = ai.generate_quiz(request_data=request.data)
        quiz = save_quiz_to_database(ai)
        quizz_data = get_quiz_with_all_data(quiz)
        return Response(
            status=status.HTTP_200_OK,
            data=quizz_data
        )
