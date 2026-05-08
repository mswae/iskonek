from django.urls import path
from .views import BookmarkListCreateView, BookmarkDeleteView, TaskListCreateView, TaskDetailView

urlpatterns = [
    path('bookmarks/', BookmarkListCreateView.as_view(), name='bookmark-list'),
    path('bookmarks/<int:pk>/', BookmarkDeleteView.as_view(), name='bookmark-delete'),
    
    path('tasks/', TaskListCreateView.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
]