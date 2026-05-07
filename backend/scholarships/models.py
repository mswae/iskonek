from django.db import models

class Scholarship(models.Model):
    title = models.CharField(max_length=255)
    tag = models.CharField(max_length=50)
    amount = models.CharField(max_length=100) # Or DecimalField if you want to perform math on it
    deadline = models.DateField()
    description = models.TextField()
    gradient = models.CharField(max_length=100)
    bookmarked = models.BooleanField(default=False)
    min_gwa = models.FloatField()
    max_income = models.IntegerField()
    course = models.CharField(max_length=100)
    link = models.URLField()