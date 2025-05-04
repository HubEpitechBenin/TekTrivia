import uuid

from django.db import models
from django.contrib.auth import get_user_model

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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    # profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
    email_confirmed = models.BooleanField(default=False)
    role = models.CharField(max_length=10)

    class Meta:
        abstract = True

class Player (BaseUser):
    level = models.PositiveIntegerField(default=0)
    current_xp = models.PositiveIntegerField(default=0)
    current_points = models.PositiveIntegerField(default=0)
    login_streak = models.PositiveIntegerField(default=0)
    login_count = models.PositiveIntegerField(default=0)
    rank = models.ForeignKey(
        'Achievements.Rank',
        on_delete=models.DO_NOTHING
    )
    title = models.ForeignKey(
        'Achievements.Title',
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True
    )
    # badges = models.ManyToManyField('Badge', on_delete=models.DO_NOTHING, null=True, blank=True)
    # acquired_res
    friends = models.ManyToManyField(
        'self',
        on_delete=models.DO_NOTHING,
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
