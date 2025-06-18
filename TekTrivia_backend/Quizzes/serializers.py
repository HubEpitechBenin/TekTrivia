from rest_framework import serializers
from .models import QuizType, Type, Difficulty, Category, Resource, Quiz, Question, QuizBody

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'my_type', 'topic', 'description']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
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
        model = Quiz
        fields = ['id', 'quiz_type', 'category', 'name', 'points_awarded', 'is_validated', 'creator', 'resources', 'difficulty']

class QuestionSerializer(serializers.ModelSerializer):
    answers = ResourceSerializer(many=True, read_only=True)
    good_answers = ResourceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'answers', 'good_answers', 'points', 'difficulty']

class QuizBodySerializer(serializers.ModelSerializer):
    quiz = QuizSerializer()
    questions = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Question.objects.all()
    )

    class Meta:
        model = QuizBody
        fields = ['id', 'quiz', 'questions']

    def create(self, validated_data):
        quiz_data = validated_data.pop('quiz')
        questions = validated_data.pop('questions')
        quiz = Quiz.objects.create(**quiz_data)
        quiz_body = QuizBody.objects.create(quiz=quiz)
        quiz_body.questions.set(questions)

        return quiz_body
