from rest_framework import serializers

from Achievements.models import Title


class TitleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Title
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
        depth = 1

    def validate(self, attrs):
        if not attrs.get('name'):
            raise serializers.ValidationError("Title name is required.")
        return attrs