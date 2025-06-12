
import logging
from typing import List, Optional, Dict, Any, Union

from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from Users.tokens import email_verification_token, password_reset_token
from Users.models import BaseUser, Player, Admin

logger = logging.getLogger(__name__)

class EmailService:
    """Service for handling all email-related functionality."""

    @classmethod
    def send_email(
            cls,
            subject: str,
            message: str,
            recipient_list: List[str],
            html_message: Optional[str] = None,
            from_email: Optional[str] = None
    ) -> bool:
        """
        Send an email with the given parameters.

        Args:
            subject: Email subject
            message: Plain text message
            recipient_list: List of recipient email addresses
            html_message: HTML version of the message (optional)
            from_email: Sender's email (defaults to settings.DEFAULT_FROM_EMAIL)

        Returns:
            bool: True if the email was sent successfully, False otherwise
        """
        if not from_email:
            from_email = settings.DEFAULT_FROM_EMAIL

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=from_email,
                recipient_list=recipient_list,
                html_message=html_message,
                fail_silently=False,
            )
            logger.info(f"Email sent successfully to {', '.join(recipient_list)}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False

    @classmethod
    def send_templated_email(
            cls,
            subject: str,
            template_name: str,
            recipient_list: List[str],
            context: Dict[str, Any],
            from_email: Optional[str] = None
    ) -> bool:
        """
        Send an email using a template.

        Args:
            subject: Email subject
            template_name: Name of the template (without extension)
            recipient_list: List of recipient email addresses
            context: Context data for the template
            from_email: Sender's email (defaults to settings.DEFAULT_FROM_EMAIL)

        Returns:
            bool: True if the email was sent successfully, False otherwise
        """
        if not from_email:
            from_email = settings.DEFAULT_FROM_EMAIL

        try:
            # Render HTML content
            html_content = render_to_string(f"{template_name}.html", context)
            # Create plain text content by stripping HTML
            text_content = strip_tags(html_content)

            # Create email message
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=from_email,
                to=recipient_list
            )

            # Attach HTML content
            email.attach_alternative(html_content, "text/html")

            # Send email
            email.send(fail_silently=False)
            logger.info(f"Templated email sent successfully to {', '.join(recipient_list)}")
            return True
        except Exception as e:
            logger.error(f"Failed to send templated email: {str(e)}")
            return False

    @classmethod
    def send_verification_email(cls, user: Union['BaseUser', 'Player', 'Admin']) -> bool:
        """
        Send an email verification link to the user.

        Args:
            user: User object that needs email verification

        Returns:
            bool: True if the email was sent successfully, False otherwise
        """
        # Generate verification token
        uidb64 = urlsafe_base64_encode(force_bytes(user.id))
        token = email_verification_token.make_token(user)

        # Create verification link
        verification_link = f"{settings.FRONTEND_URL}/verify-email/{uidb64}/{token}/"

        # Prepare context for email template
        context = {
            'user': user,
            'verification_link': verification_link,
            'site_name': 'TekTrivia',
        }

        # Send the email
        return cls.send_templated_email(
            subject="Verify Your Email Address",
            template_name="emails/verification_email",
            recipient_list=[user.email],
            context=context
        )

    @classmethod
    def send_password_reset_email(cls, user: Union['BaseUser', 'Player', 'Admin']) -> bool:
        """
        Send a password reset link to the user.

        Args:
            user: User object that requested password reset

        Returns:
            bool: True if the email was sent successfully, False otherwise
        """
        # Generate password reset token
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = password_reset_token.make_token(user)

        # Create password reset link
        reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

        # Prepare context for email template
        context = {
            'user': user,
            'reset_link': reset_link,
            'site_name': 'TekTrivia',
        }

        # Send the email
        return cls.send_templated_email(
            subject="Password Reset Request",
            template_name="emails/password_reset",
            recipient_list=[user.email],
            context=context
        )