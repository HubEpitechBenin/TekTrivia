from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from auth_models import AuthToken

# authentication related views

def refresh_auth_token(request):
    refresh_token = request.data.get('refresh')
    try:
        token = AuthToken.objects.get(refresh=refresh_token)
        token.regenerate()
        return Response({
            'token': token.key,
            'refresh': token.refresh,
        })
    except AuthToken.DoesNotExist:
        raise AuthenticationFailed('Invalid refresh token')

