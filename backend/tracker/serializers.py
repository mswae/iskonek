from rest_framework import serializers
from .models import Bookmark, Task

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'scholarship', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'scholarship', 'title', 'requirement', 'progress', 'urgency', 'created_at']