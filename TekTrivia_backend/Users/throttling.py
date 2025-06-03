from rest_framework.throttling import AnonRateThrottle

class LoginRateThrottle(AnonRateThrottle):
    """
    Custom throttle class to limit the number of login attempts.
    """
    scope = 'login'


