from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.db.models import Q
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from Users.models import Player, Admin


class CustomAuthenticationBackend(BaseBackend):

    @staticmethod
    def authenticate(request, email=None, password=None, **kwargs):
        # Define the logic that gives access to a user
        # Here, I'll authenticate against both user models
        try:
            user = Player.objects.get(email=email) or Admin.objects.get(email=email)
            if user.check_password(password):
                if user.is_active == False:
                    raise AuthenticationFailed("Account is not active")
                return user
            return None
        except Exception:
            return None

class PlayerAuthenticationBackend(BaseBackend):
    @staticmethod
    def authenticate(username=None, password=None, **kwargs):
        # Player authentication logic
        try:
            user = Player.objects.get(
                Q(email=username) | Q(username=username)
            )
            if user.check_password(password):
                if user.is_active == False:
                    raise AuthenticationFailed("Account is not active")
                return user
            return None
        except Exception:
            return None

@staticmethod
class AdminAuthenticationBackend(BaseBackend):
    def authenticate(username=None, password=None, **kwargs):
        # Player authentication logic
        try:
            user = Admin.objects.get(
                Q (email=username)
            )
            if user.check_password(password):
                if user.is_active == False:
                    raise AuthenticationFailed("Account is not active")
                return user
            return None
        except Exception:
            return None

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token['user_id']
            user_email = validated_token['email']
            user_role = validated_token['user_role']

            # Return the appropriate user based on existing roles
            if user_role == 'player':
                return Player.objects.get(id=user_id)
            elif user_role == 'admin':
                return Admin.objects.get(id=user_id)
            else:
                return None
        except Exception:
            return None
