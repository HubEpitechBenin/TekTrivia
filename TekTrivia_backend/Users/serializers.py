from tokenize import PlainToken

from django.core.mail import send_mail
from django.template.defaultfilters import default
from django.utils.http import urlsafe_base64_encode
from jwt.utils import force_bytes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

from TekTrivia.settings import FRONTEND_URL
from Users.auth_views import email_verification_token
from Users.authentication import PlayerAuthenticationBackend, AdminAuthenticationBackend
from Users.models import Player, Admin
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims here
        token['user_id'] = user.id
        token['user_role'] = user.role
        token['email'] = user.email

        return token

    def validate(self, attrs):
        # Extract credentials
        email = attrs.get('email')
        password = attrs.get('password')

        # Try to authenticate as Player first
        try:
            user = Player.objects.get(email=email)
            # Custom Password Validation
            if not check_password(password, user.password):
                raise AuthenticationFailed("Invalid credentials")
            # Here you would validate the password
            # Since you have a custom user model, you'll need to implement your own password validation
        except Player.DoesNotExist:
            # If not Player, try Admin
            try:
                user = Admin.objects.get(email=email)
                # Same password validation here
                if not check_password(password, user.password):
                    raise AuthenticationFailed("Invalid credentials")
            except Admin.DoesNotExist:
                raise AuthenticationFailed("No active account found with the given credentials")

        # Create the token
        refresh = self.get_token(user)

        data = {
            'refresh': str(refresh),
            'access': str(refresh.token)
        }

        return data



class PlayerLoginSerializer(serializers.Serializer):
    """
    Serializer for player login
    """

    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        """"
        Validates user credentials
        """
        username = data.get('username') or data.get('email')
        password = data.get('password')

        if not username:
            raise serializers.ValidationError('Username is required')
        if not password:
            raise serializers.ValidationError('Password is required')

        # Validate users with custom Auth Backend
        user = PlayerAuthenticationBackend.authenticate(
            username=username,
            password=password
        )
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        # if not user.email_confirmed:
        #     raise serializers.ValidationError('Email not confirmed')

        # if not user.is_active:
        #     raise serializers.ValidationError('Account is not active')

        # Add authenticated user to the validated_data
        data['user'] = user
        return data


class AdminLoginSerializer(serializers.Serializer):
    """
    Serializer for admin login
    """
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        """"
        Validates user credentials
        """
        username = data.get('username')
        password = data.get('password')

        if not username:
            raise serializers.ValidationError('Username is required')
        if not password:
            raise serializers.ValidationError('Password is required')

        # Validate users with custom Auth Backend
        user = AdminAuthenticationBackend.authenticate(
            username=username,
            password=password
        )
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        # if not user.email_confirmed:
        #     raise serializers.ValidationError('Email not confirmed')
        # if not user.is_active:
        #     raise serializers.ValidationError('Account is not active')

        # Add authenticated user to the validated_data
        data['user'] = user
        return data


class TokenSerializer(serializers.Serializer):
    """
    Serializer that returns JWT token after login
    """
    access = serializers.CharField()
    refresh = serializers.CharField()

class PlayerRegistrationSerializer(serializers.Serializer):
    """"
    Serializer for player registration
    """
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=25, required=False, default='')

    def validate_email(self, value):
        if Player.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        if not value.endswith('@epitech.eu'):
            raise serializers.ValidationError("Email must be an epitech email")
        return value

    def validate_username(self, value):
        if Player.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def create(self, validated_data):
        # Password Hashing
        if validated_data['password'].__len__() < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        validated_data['password'] = make_password(validated_data['password'])
        # Set default values for the Player objects
        validated_data['role'] = 'player'
        # validated_data['is_active'] = False

        # Include initial rank assignation

        player = Player.objects.create(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            phone=validated_data['phone'],
            role=validated_data['role'],
            is_active=False,
            email_confirmed=False # useless code, the default is false, but just to be sure
        )

        # Generate token and uid for email verification
        uid = urlsafe_base64_encode(force_bytes(player.id))
        token = email_verification_token.make_token(player)

        # Create the verification link
        verification_link = FRONTEND_URL + f"/verify-email/{uid}/{token}/"

        # Send verification email
        # TODO - replace with a proper email service when available
        send_mail(
            subject='Email Verification',
            message=f'Please verify your email by clicking the following link: {verification_link}',
            from_email="noreply@tektrivia.com",
            recipient_list=[player.email]
        )

        # Return the created player instance
        return player


class AdminRegistrationSerializer(serializers.Serializer):
    """
    Serializer for admin registration
    """
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=255, required=False, default='')
    is_superadmin = serializers.BooleanField(default=False)

    def validate_email(self, value):
        if Admin.objects.filter(email=value).exists():
            raise serializers.ValidationError("An admin with this email already exists.")
        if not value.endswith('@epitech.eu'):
            raise serializers.ValidationError("Email must be an epitech email")
        return value

    def create(self, validated_data):
        # Hash the password before saving
        if validated_data['password'].__len__() < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        validated_data['password'] = make_password(validated_data['password'])
        # Set default values
        validated_data['role'] = 'admin'
        validated_data['is_active'] = True

        # Create and return the Admin instance
        admin = Admin.objects.create(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data.get('phone', ''),
            is_superadmin=validated_data.get('is_superadmin', False),
            role=validated_data['role'],
            is_active=validated_data['is_active']
        )
        return admin

