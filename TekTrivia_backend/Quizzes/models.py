from django.db import models

class QuizType(models.TextChoices):
    MULTIPLE_CHOICE = 'MCQ', 'Multiple Choice Question'
    SINGLE_CHOICE = 'SCQ', 'Single Choice Question'
    TRUE_FALSE = 'TF', 'True or False'

class Type(models.TextChoices):
    EX1 = 'EX1', 'Ex1'
    EX2 = 'EX2', 'Ex2'
    EX3 = 'EX3', 'Ex3'

class Difficulty(models.TextChoices):
    EASY = 'EASY', 'Easy'
    MEDIUM = 'MEDIUM', 'Medium'
    DIFFICULT = 'DIFFICULT', 'Difficult'

class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    name = models.CharField(max_length=100, unique=True, help_text="Category name")
    description = models.TextField(help_text="Description of the category")
    my_type = models.CharField(
        max_length=10,
        choices=Type.choices
    )
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

class Resource(models.Model):
    RESOURCES_TYPE = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('link', 'Link'),
        ('text', 'Text')
    ]
    type = models.CharField(max_length=10, choices=RESOURCES_TYPE)
    file = models.FileField(upload_to='quiz_resources/')
    url = models.URLField(null=True, blank=True)

    def clean(self):
        """Validate that either file or URL is provided based on resource type"""
        from django.core.exceptions import ValidationError
        if self.type in ['image', 'video', 'audio'] and not self.file and not self.url:
            raise ValidationError(f"{self.get_type_display()} resources require either a file or URL")
        if self.type == 'link' and not self.url:
            raise ValidationError("Link resources require a URL")

class Quiz(models.Model):
    id = models.AutoField(primary_key=True, unique=True, editable=True)
    quiz_type = models.CharField(
        max_length=10,
        choices=QuizType.choices
    )
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    points_awarded = models.IntegerField(default=0)
    is_validated = models.BooleanField(default=False)
    creator = models.CharField(max_length=100)
    resources = models.ManyToManyField('Resource', related_name='resources')

    class Meta:
        verbose_name = 'Quiz'
        verbose_name_plural = 'Quizzes'
        ordering = ['name']

class Question(models.Model):
    question = models.TextField()
    answers = models.ManyToManyField('Resource', related_name='possible_answers')
    good_answers = models.ManyToManyField('Resource', related_name='good_answers')
    points = models.PositiveIntegerField()
    difficulty = models.CharField(
        max_length=10, 
        choices=Difficulty.choices
    )

class Badges(models.Model):
    id = models.AutoField(primary_key=True)
    req_XP = models.PositiveIntegerField()
    picture_link = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class QuizBody(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quiz = models.OneToOneField('Quiz', on_delete=models.CASCADE)
    questions = models.ManyToManyField('Question', related_name='questions')

# Create your models here.
