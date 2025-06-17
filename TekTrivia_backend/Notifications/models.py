from django.db import models
from datetime import datetime

class NotificationPriority(models.TextChoices):
    LOW = 'LOW', 'Low'
    MEDIUM = 'MEDIUM', 'Medium'
    HARD = 'HARD', 'Hard'

class Alignement(models.TextChoices):
    LEFT = 'LEFT', 'Left'
    CENTER = 'CENTER', 'Center'
    RIGHT = 'RIGHT', 'Right'

class SpecialAttributes(models.Model):
    code = models.CharField(
        max_length=15,
        choices=[
            ('BOLD', 'Bold'),
            ('ITALIC', 'Italic'),
            ('UNDERLINED', 'Underlined'),
            ('BORDER', 'Border'),
        ],
        unique=True
    )
    class Meta:
        verbose_name = 'SpecialAttribute'
        verbose_name_plural = 'SpecialAttributes'
    
    def __str__(self):
        return self.get_code_display()

class Text(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    content = models.TextField(help_text="Text content")
    color = models.CharField(max_length=7, help_text="Text color in hexadecimal")
    font = models.CharField(max_length=30, help_text="Font name as string")
    size = models.PositiveIntegerField(default=14, help_text="Font size in pixels")
    alignement = models.CharField(
        max_length=10,
        choices=Alignement.choices,
        default=Alignement.CENTER
    )
    special_attributes = models.ManyToManyField('SpecialAttributes', related_name='specials')
    class Meta:
        verbose_name = 'Text'
        verbose_name_plural = 'Texts'
        ordering = ['id']

class ImageElement(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    url = models.CharField(max_length=128, help_text="link to the image")
    x_position = models.PositiveIntegerField(help_text="position on x abscissa")
    y_position = models.PositiveIntegerField(help_text="position on y abscissa")
    x_size = models.PositiveIntegerField(help_text="size on x abscissa")
    y_size = models.PositiveIntegerField(help_text="size on y abscissa")
    border_radius = models.PositiveIntegerField(default=0, help_text="image border radius in pixels")

    class Meta:
        verbose_name = 'ImageElement'
        verbose_name_plural = 'ImageElements'
        ordering = ['id']

class DesignNotification(models.Model):
    background_color = models.CharField(max_length=7, help_text="Background color in hexadecimal") # ex: "#000000"
    border_radius = models.PositiveIntegerField(help_text="Border radius in pixels") # en pixels
    display_duration = models.PositiveIntegerField(default=5, help_text="Notification display duration in seconds")

    class Meta:
        verbose_name = 'DesignNotification'
        verbose_name_plural = 'DesignNotifications'

class Notifications(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    type = models.CharField(max_length=64)
    title = models.CharField(max_length=64, unique=True)
    content = models.ManyToManyField('Text', related_name='contents')
    images = models.ManyToManyField('ImageElement', related_name='images')
    sender = models.CharField(max_length=128, default="Anonymous")
    receiver = models.CharField(max_length=128, default="Anonymous")
    is_read = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    priority = models.CharField(
        max_length=10,
        choices=NotificationPriority.choices,
        default=NotificationPriority.LOW,
        help_text="Define notification priority"
    )
    design = models.ForeignKey(
        'DesignNotification', 
        on_delete=models.CASCADE,
        help_text="Design settings for a single notification"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ['id']

# Create your models here.
