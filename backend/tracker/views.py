from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Bookmark, Task
from .serializers import BookmarkSerializer, TaskSerializer

# --- BOOKMARKS ---
class BookmarkListCreateView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    # Only return bookmarks for the currently logged-in user
    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    # Automatically attach the logged-in user when creating a bookmark
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookmarkDeleteView(generics.DestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)


# --- TASKS ---
class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)