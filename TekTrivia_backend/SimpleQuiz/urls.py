from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import QuizAPIView, QuestionAPIView, AnswerAPIView, CategoryAPIView, QuizzGenerationView, SimpleQuizViewset

router = DefaultRouter()

router.register(r'ai', SimpleQuizViewset, basename='ai-quiz')
urlpatterns = [
    path('', include(router.urls)),
    path('quizzes/', QuizAPIView.as_view(), name='quiz-list-create'),
    path('questions/', QuestionAPIView.as_view(), name='question-create'),
    path('answers/', AnswerAPIView.as_view(), name='answer-create'),
    path('categories/', CategoryAPIView.as_view(), name='category-create'),
    path('generate/', QuizzGenerationView.as_view(), name='quiz-generate'),
]
