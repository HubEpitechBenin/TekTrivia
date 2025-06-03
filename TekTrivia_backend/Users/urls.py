from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .auth_views import (PlayerLoginView, AdminLoginView, CustomTokenRefreshView,
                         RequestPasswordResetView, PasswordResetConfirmView, EmailVerificationView)
from .views import PlayerViewSet, AdminViewSet, LoginTestView


router = DefaultRouter()

router.register(r'player', PlayerViewSet, basename='player')
router.register(r'admin', AdminViewSet, basename='admin')

urlpatterns = [
    path('', include(router.urls)),
    # Authentication endpoints
    path('auth/login/player/', PlayerLoginView.as_view(), name='player_login'),
    path('auth/login/admin/', AdminLoginView.as_view(), name='admin_login'),
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # User registration endpoints: Second endpoint for player and admin registration. First is in the router.
    path('auth/register/player/', PlayerViewSet.as_view({'post': 'create'}), name='player_register'),
    path('auth/register/admin/', AdminViewSet.as_view({'post': 'create'}), name='admin_register'),

    # Password reset endpoints
    path('auth/password/reset/', RequestPasswordResetView.as_view(), name='password_reset'),
    path('auth/password/reset/confirm/<str:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # Email verification endpoint
    path('auth/verify-email/<str:uidb64>/<str:token>/', EmailVerificationView.as_view(), name='email_verification'),

    # Test endpoints
    path('auth/login-test/', LoginTestView.as_view(), name='login_test'),
    # Other endpoints

]