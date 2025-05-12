import uuid

from django.contrib.auth.hashers import check_password
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.functions import Lower

# Create your models here.

User = get_user_model()

ROLE_CHOICES = [
    ('player', 'Player'),
    ('admin', 'Admin'),
]


class TimeStampedModel(models.Model):
     updated_at = models.DateTimeField(auto_now=True)
     created_at = models.DateTimeField(auto_now_add=True)
     class Meta:
         abstract = True
         ordering = ['-created_at']

class BaseUser(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    # profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
    email_confirmed = models.BooleanField(default=False)
    role = models.CharField(max_length=10)
    is_active = models.BooleanField(default=False)

    class Meta:
        abstract = True

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def check_password(self, raw_password):
        """
        Check if raw_password matches the stored password
        :param raw_password:
        :return:
        """
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        super().save(*args, **kwargs)

class Player (BaseUser):
    username = models.CharField(max_length=255, unique=True)
    level = models.PositiveIntegerField(default=0)
    current_xp = models.PositiveIntegerField(default=0)
    current_points = models.PositiveIntegerField(default=0)
    login_streak = models.PositiveIntegerField(default=0)
    login_count = models.PositiveIntegerField(default=0)
    rank = models.ForeignKey(
        'Achievements.Rank',
        on_delete=models.DO_NOTHING,
        null=True,
    )
    title = models.ForeignKey(
        'Achievements.Title',
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True
    )
    # badges = models.ManyToManyField('Badge', null=True, blank=True)
    # acquired_res
    friends = models.ManyToManyField(
        'self',
        blank=True
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='player')
    # quiz_created
    # participated_in = models.ManyToManyField()
    class Meta:
        db_table = 'player'
        verbose_name = 'Player'
        verbose_name_plural = 'Players'
        ordering = ['created_at']


class Admin (BaseUser):
    is_superadmin = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='admin')
    class Meta:
        # db_tablespace = 'Users'
        db_table = 'admin'
        verbose_name = 'Admin'
        verbose_name_plural = 'Admins'
        ordering = ['created_at']
