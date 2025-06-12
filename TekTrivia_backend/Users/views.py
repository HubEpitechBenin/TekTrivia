from django.shortcuts import render
from rest_framework import viewsets, views, status, response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from Users.models import Player, Admin
from Users.serializers import PlayerRegistrationSerializer, AdminRegistrationSerializer
from core.services.email_service import EmailService


# Create your views here.

class LoginTestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return response.Response(
            {
              "message": f"Hello World! Hello, {request.user.username}!"
            },
            status=status.HTTP_200_OK
        )


class PlayerViewSet(viewsets.ModelViewSet):
    model = Player

    def perform_create(self, serializer):
        """Override to handle custom logic after player creation."""
        player = serializer.save()
        #Send verification mail
        EmailService.send_verification_email(player)


    def create(self, request, **kwargs):
        serializer = PlayerRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(
            {
                "message": "Player registered successfully!"
            },
            status=status.HTTP_201_CREATED
        )

class AdminViewSet(viewsets.ModelViewSet):
    model = Admin

    def create(self, request, **kwargs):
        serializer = AdminRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(
            {
                "message": "Admin registered successfully!"
            },
            status=status.HTTP_201_CREATED
        )


