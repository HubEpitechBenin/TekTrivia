from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from Achievements.models import Title
from Achievements.serializers import TitleSerializer


# Create your views here.


class TitleViewSet(viewsets.ModelViewSet):
    serializer_class = TitleSerializer
    # FIXME: Make sure authentication is correctly set.
    permission_classes = [IsAuthenticated]
    authentication_classes = []
    queryset = Title.objects.all()


