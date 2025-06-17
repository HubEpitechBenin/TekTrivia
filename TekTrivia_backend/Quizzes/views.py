from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import QuizType, Type, Difficulty, Category, Resource, Quiz, Question, QuizBody
from .serializers import CategorySerializer, ResourceSerializer, QuizSerializer, QuestionSerializer, QuizBodySerializer

class QuizBodyInfoAPIView(APIView):
    def get(self, request):
        quizbodies = QuizBody.objects.all()
        serializer = QuizBodySerializer(quizbodies, many=True)
        return Response(
            data= {
                'quizzes' : serializer.data,
                'count' : len(quizbodies)
            }
        )
    def post(self, request):
        serializer = QuizBodySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
