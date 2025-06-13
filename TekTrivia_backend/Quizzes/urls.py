# from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizzViewSet


router = DefaultRouter()

router.register(r'quizz', QuizzViewSet, basename='quizz')

urlpatterns = [
    path('', include(router.urls)),
    # example endpoint for rerouting a viewset method
    # path('auth/register/player/', PlayerViewSet.as_view({'post': 'create'}), name='player_register'),

]