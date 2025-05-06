import binascii
import os
import uuid
from django.db import models
from django.conf import settings

#Function to generate a custom UUID
def generate_uuid():
    return uuid.uuid4()

class Token(models.Model):
    public_id = models.UUIDField(db_index=True, unique=True, default=generate_uuid)
    key = models.CharField(max_length=40)
    refresh = models.CharField(max_length=40, null=True)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
            self.refresh = self.generate_key()
        return super().save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def regenerate(self, force_refresh=False):
        if settings.TESTING:
            return #???
        self.key = self.generate_key()
        if force_refresh:
            self.refresh = self.generate_key()
        self.save()

    def __str__(self):
        return self.key

    class Meta:
        abstract = True

class PlayerAuthToken(Token):
    user = models.OneToOneField('models.Player', on_delete=models.CASCADE)

class AdminAuthToken(Token):
    user = models.OneToOneField('models.Admin', on_delete=models.CASCADE)


