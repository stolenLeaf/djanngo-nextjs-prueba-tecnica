from rest_framework import viewsets, permissions
from .models import Device
from .serializers import DeviceSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device._default_manager.all()
    permission_classes=[permissions.AllowAny]
    serializer_class=DeviceSerializer

