from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.db.models import Q
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from Users.models import Player, Admin


class CustomAuthenticationBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        # Define the logic that gives access to a user
        # Here, I'll authenticate against both user models
        try:
            # try to authenticate as Player first
            try:
                user = Player.objects.get(email=email)
                if user.check_password(password):
                    if not user.is_active:
                        raise AuthenticationFailed("Inactive account")
                    return user
            except Player.DoesNotExist:
                pass
            # try to authenticate as Admin now
            try:
                user = Admin.objects.get(email=email)
                if user.check_password(password):
                    if not user.is_active:
                        raise AuthenticationFailed("Inactive account")
                    return user
            except Admin.DoesNotExist:
                pass
            return None
        except Exception as e:
            # Logging the exception
            print(f"Authentication error: {str(e)}")
            return None


class PlayerAuthenticationBackend(BaseBackend):
    def authenticate(self, username=None, password=None, **kwargs):
        # Player authentication logic
        try:
            user = Player.objects.get(Q(email=username) | Q(username=username))
            if user.check_password(password):
                if not user.is_active:
                    raise AuthenticationFailed("Account is not active")
                return user
            return None
        except Player.DoesNotExist:
            return None
        except Exception as e:
            # Logging the exception
            print(f"Player Authentication error: {str(e)}")
            return None

class AdminAuthenticationBackend(BaseBackend):
    def authenticate(self, username=None, password=None, **kwargs):
        # Player authentication logic
        try:
            user = Admin.objects.get(Q(email=username))
            if user.check_password(password):
                if not user.is_active:
                    raise AuthenticationFailed("Account is not active")
                return user
            return None
        except Admin.DoesNotExist:
            return None
        except Exception as e:
            # Logging the exception
            print(f"Admin Authentication error: {str(e)}")
            return None

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token['user_id']
            user_role = validated_token['user_role']

            # Return the appropriate user based on existing roles
            if user_role == 'player':
                return Player.objects.get(id=user_id)
            elif user_role == 'admin':
                return Admin.objects.get(id=user_id)
            else:
                return None
        except (Player.DoesNotExist, Admin.DoesNotExist):
            raise InvalidToken("User not found")
        except Exception as e:
            raise InvalidToken(f'Invalid token: {str(e)}')
