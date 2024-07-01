import uuid
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

#el modedelo de usurio es el predeterminado por django

# modelo para los devices
class Device(models.Model):
    uuid= models.UUIDField(default=uuid.uuid4,editable=False)
    name= models.CharField(max_length=200)
    ip= models.CharField(max_length=50)
    status =models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)

    # Definir la señal para crear automáticamente DeviceTenants
@receiver(post_save, sender=Device)
def create_device_tenants(sender, instance, created, **kwargs):
    if created:
        DeviceTenants.objects.create(device=instance, status=instance.status)

# modelo para los deviceTenants
class DeviceTenants(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    device= models.ForeignKey(Device,on_delete=models.CASCADE)
    status =models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)

# modelo para los device logs o historicos
class DeviceLogs(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    device_tenant = models.ForeignKey(DeviceTenants,on_delete=models.CASCADE)
    test_result = models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)

# modelo para las estadisticas
class DeviceStatistics(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    device_tenant = models.ForeignKey(DeviceTenants,on_delete=models.CASCADE)
    uptime=models.IntegerField(default=0)
    downtime=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
