import uuid
from django.db import models

# Create your models here.

class Device(models.Model):
    uuid= models.UUIDField(default=uuid.uuid4,editable=False)
    name= models.CharField(max_length=200)
    ip= models.CharField(max_length=50)
    status =models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)

