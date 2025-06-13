from django.urls import path
from .views import QuizBodyInfoAPIView

urlpatterns = [
    path('quizzes/', QuizBodyInfoAPIView.as_view(), name='quiz-list')
]