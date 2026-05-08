from django.urls import path
from .views import ScholarshipListView, RegisterView, ProfileView

urlpatterns = [
    path('', ScholarshipListView.as_view(), name='scholarship-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'), # Add this line
]