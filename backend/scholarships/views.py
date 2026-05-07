from rest_framework.generics import ListAPIView
from django.db.models import Q
from .models import Scholarship, StudentProfile
from .serializers import ScholarshipSerializer

class ScholarshipListView(ListAPIView):
    serializer_class = ScholarshipSerializer

    def get_queryset(self):
        # TEMPORARY: Grab the first user profile in the database 
        # (Once auth is set up, this will be: profile = self.request.user.studentprofile)
        profile = StudentProfile.objects.first()

        # If no profile exists, return nothing
        if not profile:
            return Scholarship.objects.none()

        # The Algorithm: 
        # 1. Scholarship min_gwa must be <= Student's GWA
        # 2. Scholarship max_income must be >= Student's Income
        # 3. Course must be 'ANY' OR match the Student's Course
        queryset = Scholarship.objects.filter(
            min_gwa__lte=profile.gwa,
            max_income__gte=profile.income
        ).filter(
            Q(course='ANY') | Q(course__icontains=profile.course)
        )

        return queryset