from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Scholarship, StudentProfile
from .serializers import ScholarshipSerializer
from rest_framework.permissions import IsAuthenticated

class ScholarshipListView(ListAPIView):
    serializer_class = ScholarshipSerializer
    permission_classes = [IsAuthenticated] # Locks down the endpoint

    def get_queryset(self):
        # Extract the profile of the user holding the JWT
        try:
            profile = self.request.user.studentprofile
        except:
            return Scholarship.objects.none()

        queryset = Scholarship.objects.filter(
            min_gwa__lte=profile.gwa,
            max_income__gte=profile.income
        ).filter(
            Q(course='ANY') | Q(course__icontains=profile.course)
        )

        return queryset

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        
        # 1. Check if email is already taken
        if User.objects.filter(username=data.get('email')).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 2. Create the base User account
            user = User.objects.create_user(
                username=data.get('email'),
                email=data.get('email'),
                password=data.get('password'),
                first_name=data.get('fullName', '')
            )

            # 3. Create the linked StudentProfile
            StudentProfile.objects.create(
                user=user,
                gwa=float(data.get('gpa', 0)),
                income=int(data.get('income', 0)),
                course=data.get('program', '')
            )
            
            return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            # If something fails, delete the user so we don't have broken data
            if 'user' in locals():
                user.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
