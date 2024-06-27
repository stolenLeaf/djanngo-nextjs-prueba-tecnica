from rest_framework import serializers
from .models import Device

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'uuid','name','ip','status','created_at')
        read_only_fields = ('id','uuid','created_at')
