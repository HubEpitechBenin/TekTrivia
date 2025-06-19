from rest_framework import serializers
from .models import SCategory, SQuiz, Question, Answer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SCategory
        fields = ['id', 'name']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'quiz', 'text', 'answers']

class QuizSerializer(serializers.ModelSerializer):
    #category = CategorySerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = SQuiz
        fields = ['id', 'title', 'difficulty', 'questions']

class QuizCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SQuiz
        fields = ['id', 'title', 'difficulty']

class QuizGenerationRequestSerializer(serializers.Serializer):
    document_text = serializers.CharField()
    num_questions = serializers.IntegerField(min_value=1)
    difficulty = serializers.ChoiceField(choices=["Easy", "Medium", "Hard"])
    theme = serializers.CharField()
