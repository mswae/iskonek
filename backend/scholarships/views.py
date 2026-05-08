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
        
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.studentprofile
        except:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "fullName": user.first_name,
            "email": user.email,
            "gwa": profile.gwa,
            "income": profile.income,
            "course": profile.course,
        })

    def put(self, request):
        data = request.data
        user = request.user
        profile = user.studentprofile

        try:
            # Update User model
            if 'fullName' in data:
                user.first_name = data['fullName']
            if 'email' in data:
                user.email = data['email']
                user.username = data['email'] # Keep username and email synced
            user.save()

            # Update StudentProfile model
            if 'gwa' in data:
                profile.gwa = float(data['gwa'])
            if 'income' in data:
                profile.income = int(data['income'])
            if 'course' in data:
                profile.course = data['course']
            profile.save()

            return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)