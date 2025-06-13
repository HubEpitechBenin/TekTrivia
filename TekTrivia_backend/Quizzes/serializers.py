from rest_framework import serializers
from .models import QuizType, Type, Difficulty, Category, Resource, Quiz, Question, QuizBody

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        models = Category
        fields = ['id', 'my_type', 'topic', 'description']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        models = Resource
        fields = ['id', 'type', 'file', 'url']
    
    def validate(self, data):
        type_ = data.get('type')
        file = data.get('file')
        url = data.get('url')

        if type_ in ['image', 'video', 'audio'] and not file and not url:
            raise serializers.ValidationError(f"{type_.capitalize()} resources require a file or URL.")
        if type_ == 'link' and not url:
            raise serializers.ValidationError("Link resources require a URL.")
        return data

class QuizSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    resources = ResourceSerializer(many=True, read_only=True)

    class Meta:
        models = Quiz
        fields = ['id', 'quiz_type', 'category', 'name', 'points_awarded', 'is_validated', 'creator', 'resources', 'difficulty']

class QuestionSerializer(serializers.ModelSerializer):
    answers = ResourceSerializer(many=True, read_only=True)
    good_answers = ResourceSerializer(many=True, read_only=True)

    class Meta:
        models = Question
        fields = ['id', 'question', 'answers', 'good_answers', 'points', 'difficulty']

class QuizBodySerializer(serializers.ModelSerializer):
    quiz = QuizSerializer()
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        models = QuizBody
        fields = ['id', 'quiz', 'questions']