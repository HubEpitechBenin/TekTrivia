from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from jwt.utils import force_bytes
from rest_framework import views, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from TekTrivia.settings import FRONTEND_URL
from Users.throttling import LoginRateThrottle
from Users.serializers import PlayerLoginSerializer, AdminLoginSerializer, TokenSerializer
from .auth_models import PlayerAuthToken, AdminAuthToken
from .models import Player, Admin
from .tokens import password_reset_token, email_verification_token

# authentication related views

class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom Token Refresh View to handle token refresh requests
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response(
                {'error': 'Refresh token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Validate the refresh token
            refresh = RefreshToken(refresh_token)

            # Generate new access token
            data = {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }

            return Response(data, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response(
                {'error': f"Invalid refresh token: {str(e)}"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': f"Token refresh failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PlayerLoginView(views.APIView):
    """
    API View for Player Login that returns JWT token if successful
    """
    permission_classes = [] # To allow anyone to use the view
    throttle_classes = [LoginRateThrottle]

    def post(self, request):
        """
        Handles login request and returns JWT token
        """
        try:
            # Validate incoming data with the appropriate serializer
            serializer = PlayerLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Retrieve authenticated user from validated serializer
            user = serializer.validated_data['user']

            # Generate JWT tokens for the user

            tokens = self.get_tokens_for_user(user)
            token_serializer = TokenSerializer(data=tokens)
            token_serializer.is_valid(raise_exception=True)

            return Response(
                token_serializer.data,
                status=status.HTTP_200_OK
            )
        except AuthenticationFailed as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': f'Login failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
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
    throttle_classes = [LoginRateThrottle]

    def post(self, request):
        """"
        Handles login request and returns JWT token
        """
        try:
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
        except AuthenticationFailed as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': f'Login failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
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


# TODO - Implement logout view

class RequestPasswordResetView(views.APIView):
    permission_classes = []

    def post(self, request):
        """
        Handle password reset request and send a token to the user's email.
        """
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Try to find the user by email
        try:
            user = Player.objects.get(email=email)
        except Player.DoesNotExist:
            try:
                user = Admin.objects.get(email=email)
            except Admin.DoesNotExist:
                # Protecting user privacy by not revealing if the email exists
                return Response(
                    {"message": "If an account with this email exists, a password reset link has been sent."},
                    status=status.HTTP_200_OK
                )
        # Generate a password reset token and uid
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = password_reset_token.make_token(user)

        # Create a password reset link
        reset_link = FRONTEND_URL + "/reset-password/{uid}/{token}/"

        # Send the reset link to the user's email
        # TODO - Implement email service or use an existing one (e.g., Django's send_mail)
        # TODO - Implement email sending logic
        send_mail(
            subject="Password Reset Request",
            message=f"Click the link to reset your password: {reset_link.format(uid=uid, token=token)}",
            from_email="noreply@tektrivia.com", #doesn't exist, just a placeholder
            recipient_list=[email]
        )
        return Response(
            {"message": "If an account with this email exists, a password reset link has been sent."},
            status=status.HTTP_200_OK
        )


class PasswordResetConfirmView(views.APIView):
    permission_classes = []

    def post(self, request, uid, token):
        """
        Handle password reset confirmation and update the user's password.
        """
        new_password = request.data.get('new_password')

        if not (uid and token and new_password):
            return Response(
                {'error': 'All fields are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(new_password) < 8:
            return Response(
                {'error': 'Password must be at least 8 characters long'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            # Decode the uid to get the user ID
            user_id = force_str(urlsafe_base64_decode(uid).decode())
            # Try to find the user by ID
            try:
                user = Player.objects.get(id=user_id)
            except Player.DoesNotExist:
                try:
                    user = Admin.objects.get(id=user_id)
                except Admin.DoesNotExist:
                    return Response(
                        {'error': 'Invalid reset link'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            # Validate the token
            if not password_reset_token.check_token(user, token):
                return Response(
                    {'error': 'Invalid or expired token'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Update the user's password
            user.password = make_password(new_password)
            user.save()

            return Response(
                {'message': 'Password has been reset successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Password reset failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class EmailVerificationView(views.APIView):
    """
    View to handle email verification for users.
    """
    permission_classes = []

    def get(self, request, uidb64, token):

        try:
            # Decode the user ID from the uidb64
            uid = force_str(urlsafe_base64_decode(uidb64))

            # Try to find the user by ID
            try:
                user = Player.objects.get(id=uid)
            except Player.DoesNotExist:
                try:
                    user = Admin.objects.get(id=uid)
                except Admin.DoesNotExist:
                    return Response(
                        {'error': 'Invalid verification link'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            # Validate the token
            if not email_verification_token.check_token(user, token):
                return Response(
                    {'error': 'Invalid or expired verification link'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Mark the user's email as confirmed and activate the account
            user.email_confirmed = True
            user.is_active = True
            user.save()

            return Response(
                {'message': 'Email verification successful'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': f'Email verification failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
