from django.urls import path
from .views import ScholarshipListView, RegisterView, ProfileView, AdminScholarshipView

urlpatterns = [
    path('scholarships/', ScholarshipListView.as_view(), name='scholarship-list'),
    path('scholarships/register/', RegisterView.as_view(), name='register'),
    path('scholarships/profile/', ProfileView.as_view(), name='profile'),
    
    # New admin route
    path('scholarships/admin/add/', AdminScholarshipView.as_view(), name='admin-add-scholarship'),
]