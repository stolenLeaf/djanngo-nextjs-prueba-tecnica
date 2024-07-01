from rest_framework.decorators import api_view
from rest_framework.response import Response, Serializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


# Create your views here.
@api_view(['POST'])
def login(request):

    user=get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"error":"invalid credential"},status=status.HTTP_400_BAD_REQUEST)

    token,created =Token.objects.get_or_create(user=user)
    Serializer= UserSerializer(instance=user)

    return Response({"token":token.key,"user":Serializer.data},status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    
    print(request.data)
    serializer= UserSerializer(data=request.data)
    if serializer.is_valid():
        print(request.data)
        serializer.save()

        user=User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['password'])
        user.save()

        token=Token.objects.create(user=user)
        return Response({'token':token.key,'user':serializer.data},status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def profile(request):
    return Response({})
