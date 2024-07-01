from django.contrib.admin.options import transaction
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import status
from .models import Device
from .serializers import DeviceLogSerializers, DeviceLogs, DeviceSerializer, DeviceStatisticsSerializer, DeviceTenants, DeviceTenantsSerializer, DeviceStatistics
from rest_framework.decorators import action

# viewset para los devices
class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device._default_manager.all()
    permission_classes=[permissions.AllowAny]
    serializer_class=DeviceSerializer

    @action(detail=True,methods=['post'])
    def status(self,request,pk=None):
        device=self.get_object()
        device.status=not device.status
        device.save()
        return Response({'status':device.status},status=status.HTTP_200_OK)


    @action(detail=True, methods=['post'])
    def ping(self, request, pk=None):
        try:
            device = Device.objects.get(pk=pk)

            # Obtener el device_tenant asociado al dispositivo
            try:
                device_tenant = DeviceTenants.objects.get(device=device)
            except DeviceTenants.DoesNotExist:
                return Response({"message": "DeviceTenants not found"}, status=status.HTTP_404_NOT_FOUND)

            with transaction.atomic():
                # Obtener el estado actual del dispositivo
                status_device = device.status
                
                # Crear el registro de log para el dispositivo (descomentar según sea necesario)
                log = DeviceLogs.objects.create(device_tenant=device_tenant, test_result=status_device)

                # Actualizar o crear DeviceStatistics basado en el estado del dispositivo
                statistic, created = DeviceStatistics.objects.get_or_create(
                    device_tenant=device_tenant,
                    defaults={'uptime': 0, 'downtime': 0}
                )
                if status_device:
                    statistic.uptime += 1
                else:
                    statistic.downtime += 1
                statistic.save()

                # Preparar la respuesta basada en el estado del dispositivo
                if status_device:
                    response = '80 ms'
                else:
                    response = 'Time out'

            return Response({"message": response}, status=status.HTTP_200_OK)

        except Device.DoesNotExist:
            return Response({"message": "Device not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST) 



    # @action(detail=True,methods=['post'])
    # def ping(self,request,pk=None):
    #     device= self.get_object()

    #     try:
    #         with transaction.atomic():
    #             #get the current status from device
    #             statusdevice= device.status
    #             
    #             # #create device log for device
    #             print("000000000000-#################################")
    #             device_tenant=DeviceTenants.objects.get(device=device)
    #             print(device_tenant)
    #             # log= DeviceLogs.objects.create(device_tenant=device_tenant,test_result=statusdevice)

    #             # #update or create deviceStatistic based on status
    #             statistic, created =DeviceStatistics.objects.get_or_create(device_tenant=device_tenant, defaults={'uptime': 0, 'downtime': 0})
    #             if statusdevice:
    #                 statistic.uptime+=1
    #             else:
    #                 statistic.downtime+=1

    #             # statistic.save()

    #             if statusdevice:
    #                 response= '80 ms'
    #             else:
    #                 response='Time out'

    #             return Response({"message":response},status=status.HTTP_200_OK)

    #     except Device.DoesNotExist:
    #         return Response({"message": "Device not found"}, status=status.HTTP_404_NOT_FOUND)
    #     except Exception as e:
    #         return Response({'MESSAGE':e},status=status.HTTP_400_BAD_REQUEST)
    
class DeviceTenantsViewSet(viewsets.ModelViewSet):
    queryset= DeviceTenants._default_manager.all()
    permission_classes=[permissions.AllowAny]
    serializer_class=DeviceTenantsSerializer

class DeviceLogViewSet(viewsets.ModelViewSet):
    queryset=DeviceLogs._default_manager.all()
    permission_classes=[permissions.AllowAny]
    serializer_class=DeviceLogSerializers

class DeviceStatisticsViewSet(viewsets.ModelViewSet):
    queryset=DeviceStatistics._default_manager.all()
    permission_classes=[permissions.AllowAny]
    serializer_class=DeviceStatisticsSerializer


