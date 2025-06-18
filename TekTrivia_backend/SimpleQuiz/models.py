from django.db import models

class SCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SQuiz(models.Model):
    title = models.CharField(max_length=200)
    # category = models.ForeignKey(SCategory, on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(SQuiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.text} ({'Correct' if self.is_correct else 'Incorrect'})"

# Create your models here.
