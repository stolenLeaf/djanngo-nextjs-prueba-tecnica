from rest_framework import routers
from .api import DeviceLogViewSet, DeviceStatisticsViewSet, DeviceTenantsViewSet, DeviceViewSet

router = routers.DefaultRouter()

router.register('api/device',DeviceViewSet,'devices')
#agregar rutas
router.register('api/deviceTenants',DeviceTenantsViewSet,'deviceTenants')
router.register('api/deviceLogs',DeviceLogViewSet,'deviceLogs')
router.register('api/deviceStatistics',DeviceStatisticsViewSet,'deviceStatistics')

urlpatterns= router.urls
