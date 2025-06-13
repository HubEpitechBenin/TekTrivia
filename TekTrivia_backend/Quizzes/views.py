from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import QuizType, Type, Difficulty, Category, Resource, Quiz, Question, QuizBody
from .serializers import CategorySerializer, ResourceSerializer, QuizSerializer, QuestionSerializer, QuizBodySerializer

class QuizBodyInfoAPIView(APIView):
    def get(self, request):
        quizbodies = QuizBody.objects.all()
        serializer = QuizBodySerializer({
            'quizzes': quizbodies,
            'count': len(quizbodies) 
        })
        return Response(serializer.data)

# Create your views here.
