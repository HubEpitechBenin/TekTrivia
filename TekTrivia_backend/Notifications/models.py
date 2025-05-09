from django.db import models
from enum import Enum
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional, Literal, Tuple
from django.contrib.postgres.fields import JSONField 

@dataclass
class Text:
    content: str
    color: str  # ex: "#FFFFFF"
    font: str   # ex: "Arial", "Roboto"
    size: int = 14  # en pixels
    alignement: Literal['gauche', 'centre', 'droite'] = 'gauche'
    special_attributes: List[Literal['bold', 'italic', 'underlined', 'border']] = field(default_factory=list)

@dataclass
class ImageElement:
    url: str
    position: Tuple[int, int]  # (x, y) en pixels
    size: Tuple[int, int]  # (width, height) en pixels

@dataclass
class DesignNotification:
    background_color: str  # ex: "#000000"
    border_radius: int  # en pixels
    images: Optional[List[ImageElement]] = field(default_factory=list)
    date_notification: datetime = field(default_factory=datetime.now) #la date actuelle par défaut
    sender: str  # nom ou identifiant
    display_duration: int = 5  # en secondes

class Priority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Notifications(models.Model):
    type = models.CharField(max_length=64)
    content = JSONField() #liste d'objets JSON contenant des attributs de Text
    title = models.CharField(max_length=64, unique=True)
    content = models.TextField()
    receiver = models.CharField(max_length=128)
    is_read = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    priority = models.ForeignKey('Priority', on_delete=models.CASCADE)
    design = models.OneToOneField(DesignNotification, on_delete=models.CASCADE) #Une notification -> design unique, un design -> une notification
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# Create your models here.
