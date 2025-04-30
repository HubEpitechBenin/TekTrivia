from django.db import models
import uuid

from django.db import models
from django.contrib.auth import get_user_model
from Users.models import TimeStampedModel
# Create your models here.


class Title (TimeStampedModel):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    # image = models.ImageField(upload_to='achievements_images')
    class Meta:
        verbose_name = 'Title'
        verbose_name_plural = 'Titles'
        ordering = ['id']

class Rank (TimeStampedModel):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description =models.TextField()
    min_xp = models.PositiveIntegerField()
    nex_rank = models.ForeignKey(
        'self',
        on_delete=models.DO_NOTHING,
        null=True
    )
    class Meta:
        verbose_name = 'Rank'
        verbose_name_plural = 'Ranks'
        ordering = ['min_xp']