from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegistrationSerializer, UserProfileSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from django.utils.translation import gettext_lazy as _

# Create your views here.
class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("Request data:", request.data)
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id': user.id}, status=status.HTTP_201_CREATED)
        else:
            print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        identifier = request.data.get('username')
        password = request.data.get('password')

        try:
            if "@" in identifier:
                user = User.objects.get(email = identifier)
            else:
                user = User.objects.get(username=identifier)
            
            if user.check_password(password):
                token,_=Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user_id': user.id})
            else:
                return Response({'error':_("Invalid credentials")}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            return Response({'error':_("Invalid credentials")}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print("Validation errors:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
