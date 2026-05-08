from django.db import models
from django.contrib.auth.models import User
from scholarships.models import Scholarship

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'scholarship') # Prevents double-bookmarking

    def __str__(self):
        return f"{self.user.username} saved {self.scholarship.title}"

class Task(models.Model):
    PROGRESS_CHOICES = [
        ('Not Started', 'Not Started'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    URGENCY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    scholarship = models.ForeignKey(Scholarship, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    requirement = models.CharField(max_length=255)
    progress = models.CharField(max_length=20, choices=PROGRESS_CHOICES, default='Not Started')
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, default='Medium')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"