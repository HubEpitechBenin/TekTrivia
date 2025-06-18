from django.contrib.auth.tokens import PasswordResetTokenGenerator


class PasswordResetTokenGenerator(PasswordResetTokenGenerator):
    # def _make_hash_value(self, user: Player | Admin, timestamp):
    def _make_hash_value(self, user, timestamp):
        """
        Generate a hash value for the password reset token.
        This includes the user's ID, email, and the timestamp.
        """
        return f"{user.id}{timestamp}{user.is_active}"



class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    def  _make_hash_value(self, user, timestamp):
        return f"{user.id}{timestamp}{user.email_confirmed}"

password_reset_token = PasswordResetTokenGenerator()

email_verification_token = EmailVerificationTokenGenerator()
