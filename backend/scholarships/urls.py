from django.urls import path
from .views import ScholarshipListView, RegisterView

urlpatterns = [
    path('', ScholarshipListView.as_view(), name='scholarship-list'),
    path('register/', RegisterView.as_view(), name='register'),
]