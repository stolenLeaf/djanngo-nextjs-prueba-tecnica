from rest_framework import routers
from .api import DeviceViewSet

router = routers.DefaultRouter()

router.register('api/device',DeviceViewSet,'devices')

urlpatterns= router.urls
