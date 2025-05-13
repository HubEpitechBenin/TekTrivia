from django.db import models
from enum import Enum, unique


class QuizType(models.TextChoices):
    QCM = 'QCM', 'Question à choix multiples'
    QCU = 'QCU', 'Question à choix unique'
    VRAI_FAUX = 'VF', 'Vrai ou Faux'

class Type(Enum):
    EX1 = "ex1"
    EX2 = "ex2"
    EX3 = "ex3"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    DIFFICULT = "difficult"

class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    # id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    my_type = models.ForeignKey('Type', on_delete=models.CASCADE)
    
class Quiz(models.Model):
    id = models.AutoField(primary_key=True)
    quiz_type = models.ForeignKey('QuizType', on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    points_awarded = models.IntegerField(default=0)
    is_validated = models.BooleanField(default=False)
    creator = models.CharField(max_length=100)
    #liste des ressources qui sera du polymorphisme
    #L'attribut virtuel de type Resource est automatiquement crée
    

class Resource(models.Model):
    RESOURCES_TYPE = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('link', 'Link'),
    ]
    resources = models.ForeignKey(
        Quiz,
        related_name='contents',
        on_delete=models.CASCADE
    )
    type = models.CharField(max_length=10, choices=RESOURCES_TYPE)
    file = models.FileField(upload_to='/contents')
    url = models.URLField(null=True, blank=True)

class Question(models.Model):
    question = models.TextField()
    answers = models.TextField()
    good_answers = models.TextField()
    list_images = models.TextField()
    points = models.IntegerField()
    difficulty = models.ForeignKey('Difficulty', on_delete=models.CASCADE)

    def split_field(self, field_name, separator=','):
        value = getattr(self, field_name, '')
        if not value:
            return []
        return [item.strip() for item in value.split(separator) if item.strip()]

class Badges(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    req_XP = models.PositiveIntegerField()
    picture_link = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class QuizBody(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quiz = models.OneToOneField(Quiz, on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question, related_name='questions')

# Create your models here.
