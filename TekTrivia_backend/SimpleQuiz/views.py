import json
import re
from logging import exception
from pyexpat.errors import messages
from unicodedata import category

from django.db import transaction
from django.db.models import Q
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from drf_spectacular.utils import extend_schema

from core.services.ai_services import AIService
from .models import SCategory, SQuiz
from .serializers import QuizSerializer, QuizCreateSerializer
from .models import Question
from .serializers import QuestionSerializer
from rest_framework.views import APIView
from .models import Answer
from .serializers import AnswerSerializer
from .models import SCategory
from .serializers import CategorySerializer
from .serializers import QuizGenerationRequestSerializer

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


class SimpleQuizViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    model = SQuiz
    # queryset = SQuiz.objects.all()
    serializer_class = QuizSerializer

    def get_queryset(self):
        queryset = SQuiz.objects.all()

        difficulty = self.request.query_params.get('difficulty')
        title = self.request.query_params.get('title')
        search = self.request.query_params.get('search')

        if difficulty is not None:
            queryset = queryset.filter(difficulty=category)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        if search is not None:
            queryset = queryset.filter(
                Q(title__icontains=search)
                # Q(questions__questions__text__icontains=search) |
                # Q(questions__answers__text__icontains=search)
                )

        return queryset
    
    @extend_schema(
        request=QuizGenerationRequestSerializer,
        responses=QuizSerializer,
        description="Generate a quiz on a topic using AI"
    )
    @action(detail=False, methods=['post'])
    def generate(self, request, *args, **kwargs):
        # if 'file' in request.FILES:
        #     file = request.FILES['file']
        # else:
        #     return Response(
        #         status=HTTP_400_BAD_REQUEST,
        #         data={
        #             "message": "You need to upload a reference file to generate a quiz"
        #         }
        #     )

        # ai = AIService().OpenRouterClient()
        ai = AIService().OpenAIClient()
        # try:
        #     generated_data = ai.generate_quiz(request_data=request.data, request_files=request.FILES)
        generated_data = ai.generate_quiz(request_data=request.data, request_files=request.FILES)
        # print(generated_data)
        # try:
        #     generated_data = generated_data['choices'][0]['message']['content']
        # except Exception as e:
        #     return Response(
        #         status=status.HTTP_400_BAD_REQUEST,
        #         data= {
        #             'message': f"AI API is currently unavailable. Try manual creation or sponsor Tektrivia for better AI availability."
        #         }
        #     )
        # json_match = re.search(r'```json\n(.*?)\n```', generated_data, re.DOTALL)
        # quiz_json = generated_data
        # quiz_json = json.loads(generated_data.group(1))
        quiz_json = json.loads(generated_data)
        # print(quiz_json)
        with transaction.atomic():
            quiz = SQuiz.objects.create(
                title=quiz_json['title'],
                difficulty=quiz_json['difficulty'],
                description=quiz_json['description']
            )
            quiz_body = quiz_json.get('Body')
            if not quiz_body:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={
                        'message': "Invalid quiz body"
                    }
                )
            for Jquestion in quiz_body:
                question = Question.objects.create(
                    quiz=quiz,
                    text=Jquestion['Question']
                )
                # TODO - Replace with an answer list in the template sent in ai_services
                # FIXME - Before that we could use a loop to refactor this
                A = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerA']['answer'],
                    is_correct=Jquestion['AnswerA']['is_correct']
                )
                B = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerB']['answer'],
                    is_correct=Jquestion['AnswerB']['is_correct']
                )
                C = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerC']['answer'],
                    is_correct=Jquestion['AnswerC']['is_correct']
                )
                D = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerD']['answer'],
                    is_correct=Jquestion['AnswerD']['is_correct']
                )
            # serializer = QuizSerializer(data=quiz)
            # serializer.is_valid(raise_exception=True)
            # quiz = serializer.save()

        return Response(
            data={
                'message': f"Quiz '{quiz_json['title']}' generated successfully",
                'quiz':QuizSerializer(quiz).data
            },
            status=status.HTTP_201_CREATED
        )

    def retrieve(self, request, *args, **kwargs):
        quizzes = SQuiz.objects.filter(title=kwargs['pk'])
        return Response(
            data=QuizSerializer(quizzes, many=True).data,
            status=HTTP_200_OK
        )

class QuizzGenerationView(APIView):
    
    def post(self, request):
        ai = AIService().OpenRouterClient()
        generated_data = ai.generate_quiz(request_data=request.data)
        generated_data = generated_data['choices'][0]['message']['content']
        json_match = re.search(r'```json\n(.*?)\n```', generated_data, re.DOTALL)
        quiz_json = json.loads(json_match.group(1))
        print(quiz_json)
        with transaction.atomic():
            quiz = SQuiz.objects.create(
                title=quiz_json['title'],
                difficulty=quiz_json['difficulty'],
            )
            quiz_body = quiz_json.get('Body')
            if not quiz_body:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={
                        'message': "Invalid quiz body"
                    }
                )
            for Jquestion in quiz_body:
                question = Question.objects.create(
                    quiz=quiz,
                    text=Jquestion['Question']
                )
                # TODO - Replace with an answer list in the template sent in ai_services
                # FIXME - Before that we could use a loop to refactor this
                A = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerA']['answer'],
                    is_correct=Jquestion['AnswerA']['is_correct']
                )
                B = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerB']['answer'],
                    is_correct=Jquestion['AnswerB']['is_correct']
                )
                C = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerC']['answer'],
                    is_correct=Jquestion['AnswerC']['is_correct']
                )
                D = Answer.objects.create(
                    question=question,
                    text=Jquestion['AnswerD']['answer'],
                    is_correct=Jquestion['AnswerD']['is_correct']
                )
            # serializer = QuizSerializer(data=quiz)
            # serializer.is_valid(raise_exception=True)
            # quiz = serializer.save()
        return Response(
            data=quiz,
            status=status.HTTP_201_CREATED
        )
# Create your views here.

# class QuizzGenerationView(APIView):
#     def post(self, request):
#         ai = AIService().OpenRouterClient()
#         ai = ai.generate_quiz(request_data=request.data)
#         quiz = save_quiz_to_database(ai)
#         quizz_data = get_quiz_with_all_data(quiz)
#
#         for question in quizz_data['Body']:
#
#
#
#         return Response(
#             status=status.HTTP_200_OK,
#             data=quizz_data
#         )
