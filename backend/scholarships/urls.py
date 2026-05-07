from django.urls import path
from .views import ScholarshipListView

urlpatterns = [
    path('', ScholarshipListView.as_view(), name='scholarship-list'),
]