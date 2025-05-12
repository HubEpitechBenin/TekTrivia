from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from Users.serializers import PlayerLoginSerializer, AdminLoginSerializer, TokenSerializer
from .auth_models import PlayerAuthToken, AdminAuthToken

# authentication related views


class PlayerLoginView(views.APIView):
    """
    API View for Player Login that returns JWT token if successful
    """
    permission_classes = [] # To allow anyone to use the view

    def post(self, request):
        """"
        Handles login request and returns JWT token
        """
        # Validate incoming data with the appropriate serializer
        serializer = PlayerLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Retrieve authenticated user drom validated serializer
        user = serializer.validated_data['user']

        # Generate JWT tokens for the user

        tokens = self.get_tokens_for_user(user)
        token_serializer = TokenSerializer(data=tokens)
        token_serializer.is_valid(raise_exception=True)

        return Response(
            token_serializer.data,
            status=status.HTTP_200_OK
        )

    def get_tokens_for_user(self, user):
        """
        Generate JWT tokens for the user
        """

        try:
            # Find and regenerate existing token
            refresh = PlayerAuthToken.objects.get(user=user)
            refresh.regenerate(force_refresh=True)
        except PlayerAuthToken.DoesNotExist:
            # Create a new token if none
            refresh = PlayerAuthToken(user=user)
            refresh.save()
        return {
            'refresh': str(refresh),
            'access': str(refresh.access)
        }


class AdminLoginView(views.APIView):
    """
    API View for Player Login that returns JWT token if successful
    """
    permission_classes = []  # To allow anyone to use the view

    def post(self, request):
        """"
        Handles login request and returns JWT token
        """
        # Validate incoming data with the appropriate serializer
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Retrieve authenticated user drom validated serializer
        user = serializer.validated_data['user']

        # Generate JWT tokens for the user

        tokens = self.get_tokens_for_user(user)
        token_serializer = TokenSerializer(data=tokens)
        token_serializer.is_valid(raise_exception=True)

        return Response(
            token_serializer.data,
            status=status.HTTP_200_OK
        )

    def get_tokens_for_user(self, user):
        """
        Generate JWT tokens for the user
        """

        try:
            # Find and regenerate existing token
            refresh = AdminAuthToken.objects.get(user=user)
            refresh.regenerate(force_refresh=True)
        except AdminAuthToken.DoesNotExist:
            # Create a new token if none
            refresh = AdminAuthToken(user=user)
            refresh.save()
        return {
            'refresh': str(refresh),
            'access': str(refresh.access)
        }