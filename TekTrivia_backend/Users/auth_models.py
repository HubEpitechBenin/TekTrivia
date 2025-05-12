import binascii
import os
import uuid
from django.db import models
from django.conf import settings

from Users.models import Player, Admin


#Function to generate a custom UUID
def generate_uuid():
    return uuid.uuid4()

def generate_key():
    return binascii.hexlify(os.urandom(20)).decode()

class Token(models.Model):
    public_id = models.UUIDField(db_index=True, unique=True, default=generate_uuid)
    access = models.CharField(max_length=40)
    refresh = models.CharField(max_length=40, null=True)

    def save(self, *args, **kwargs):
        if not self.access:
            self.access = generate_key()
        if not self.refresh:
            self.refresh = generate_key()
        return super().save(*args, **kwargs)

    def regenerate(self, force_refresh=False):
        # if settings.TESTING:
        #     return #???
        self.access = generate_key()
        if force_refresh:
            self.refresh = generate_key()
        self.save()

    def __str__(self):
        return self.refresh

    class Meta:
        abstract = True

class PlayerAuthToken(Token):
    user = models.OneToOneField(Player, on_delete=models.CASCADE)

class AdminAuthToken(Token):
    user = models.OneToOneField(Admin, on_delete=models.CASCADE)
#

