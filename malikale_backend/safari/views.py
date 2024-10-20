from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SafariPackage, Review, Booking
from .serializers import SafariPackageSerializer, ReviewSerializer, BookingSerializer, BookingDetailSerializer
from rest_framework import generics, permissions, status
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from requests.auth import HTTPBasicAuth
import requests

# Create your views here.

def safari_detail_view(request, safariId):
    try:
        safari = SafariPackage.objects.get(id=safariId)
        data = {
            'id': safari.id,
            'title': safari.title,
            'duration': safari.duration,
            'price': safari.price,
            'location': safari.location,
            'description': safari.description,
            'people': safari.people,
            'image': safari.image.url if safari.image else None,
            'image2': safari.image2.url if safari.image2 else None,
            'overview': safari.overview,
            'highlights': safari.highlights,
            'itinerary': safari.itinerary,
            'mapEmbedUrl': safari.map_embed_url, 
        }
        return JsonResponse(data)
    except SafariPackage.DoesNotExist:
        return JsonResponse({'error': 'Safari not found'}, status=404)

class SafariPackageListView(APIView):
    def get(self, request, *args, **kwargs):
        safaris = SafariPackage.objects.all()
        serializer = SafariPackageSerializer(safaris, many=True)
        return Response(serializer.data)
    

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Review.objects.filter(user=self.request.user)
        
        safari_id = self.request.query_params.get('safariId')
        if safari_id:
            return Review.objects.filter(safari_id=safari_id)
        return Review.objects.none()

    def perform_create(self, serializer):
        print(self.request.data)
        safari = SafariPackage.objects.get(id=self.request.data['safari'])
        serializer.save(user=self.request.user, safari=safari, rating=self.request.data['rating'])


class SafariReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        safari_id = self.kwargs['safari_id']
        return Review.objects.filter(safari_id=safari_id)


class ReviewUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.get_object().user == self.request.user:
            serializer.save()

    def perform_destroy(self, instance):
        if instance.user == self.request.user:
            instance.delete()



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    request.data['user'] = request.user.id
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'Booking created successfully'},
            status=status.HTTP_201_CREATED
        )
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserBookingsView(generics.ListAPIView):
    serializer_class = BookingDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
    

# safaricom mpesa logic
def generate_token():
    consumer_key = "M49wGG9HSiKNcGOHAsBU6xuyGBNAWMLiRsMsnuL0FEzyft3U"
    consumer_secret = "1N0mt5zTTthAKjbnTgzwd2aoUubQTCt9VIcrjFYHRNnkuTMGy6qyOk53RoQKjyAi"
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    return response.json().get('access_token')



def stk_push(amount, phone_number, callback_url):
    access_token = generate_token()
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    payload = {
        "BusinessShortCode": "174379",
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
        "Timestamp":"20160216165627",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": "174379",
        "PhoneNumber": phone_number,
        "CallBackURL": "",
        "AccountReference":"Test",    
        "TransactionDesc":"Test"
    }