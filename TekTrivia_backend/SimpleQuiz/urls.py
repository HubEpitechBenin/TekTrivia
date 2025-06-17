from django.urls import path
from .views import QuizAPIView, QuestionAPIView, AnswerAPIView, CategoryAPIView

urlpatterns = [
    path('quizzes/', QuizAPIView.as_view(), name='quiz-list-create'),
    path('questions/', QuestionAPIView.as_view(), name='question-create'),
    path('answers/', AnswerAPIView.as_view(), name='answer-create'),
    path('categories/', CategoryAPIView.as_view(), name='category-create')
]
