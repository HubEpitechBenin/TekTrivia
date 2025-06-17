from django.urls import path
from .views import QuizBodyInfoAPIView

urlpatterns = [
    path('', QuizBodyInfoAPIView.as_view(), name='quiz-list')
]