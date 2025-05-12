from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .auth_views import PlayerLoginView, AdminLoginView
from .views import PlayerViewSet, AdminViewSet

router = DefaultRouter()

router.register(r'player', PlayerViewSet, basename='player')
router.register(r'admin', AdminViewSet, basename='admin')

urlpatterns = [
    path('', include(router.urls)),
    # Login URL patterns
    path('login/player/', PlayerLoginView.as_view(), name='player_login'),
    path('login/admin/', AdminLoginView.as_view(), name='admin_login'),
    # Other URL patterns

]