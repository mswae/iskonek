from rest_framework.generics import ListAPIView
from .models import Scholarship
from .serializers import ScholarshipSerializer

class ScholarshipListView(ListAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer