from rest_framework import serializers
from .models import Device, DeviceLogs, DeviceTenants, DeviceStatistics
from django.contrib.auth.models import User

# serializador para los devices
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'uuid','name','ip','status','created_at')
        read_only_fields = ('id','uuid','created_at')

# serializador para los usuarios
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=('id','username','email','password')
        read_only_fields = ('id','uuid','created_at')

# serializador para los deviceTenants
class DeviceTenantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceTenants
        fields= '__all__'
        read_only_fields = ('id','uuid','created_at')

# serializador para los deviceLogs o historicos
class DeviceLogSerializers(serializers.ModelSerializer):
    class Meta:
        model = DeviceLogs
        fields= '__all__'
        read_only_fields = ('id','uuid','created_at')

# serializador para las estadisticas
class DeviceStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model=DeviceStatistics
        fields= '__all__'
        read_only_fields = ('id','uuid','created_at')


