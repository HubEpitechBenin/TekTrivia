from rest_framework import serializers
from .models import SCategory, SQuiz, Question, Answer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SCategory
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    #category = CategorySerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = SQuiz
        fields = '__all__'

class QuizCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SQuiz
        fields = '__all__'

class QuizGenerationRequestSerializer(serializers.Serializer):
    document_text = serializers.CharField()
    num_questions = serializers.IntegerField(min_value=1)
    difficulty = serializers.ChoiceField(choices=["Easy", "Medium", "Hard"])
    theme = serializers.CharField()
