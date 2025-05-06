from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .auth_models import PlayerAuthToken, AdminAuthToken

def generate_auth_token(user):
    if user.role == 'admin':
        token = AdminAuthToken.objects.create(user=user)
    elif user.role == 'player':
        token = PlayerAuthToken.objects.create(user=user)
    else:
        raise Exception('Invalid user role')
    return token.key, token.refresh

class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        token_key = auth_header.split(' ')[1]
        try:
            token = PlayerAuthToken.objects.get(key=token_key)
        except PlayerAuthToken.DoesNotExist:
            raise AuthenticationFailed('Invalid token')
        return (token.user, token)

