from django.db import models

class Badges(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    req_XP = models.PositiveIntegerField()
    picture_link = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Badge'
        verbose_name_plural = 'Badges'
        ordering = ['category']

# Create your models here.
