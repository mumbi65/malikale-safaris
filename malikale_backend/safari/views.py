from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SafariPackage, Review, Booking, Payment
from .serializers import SafariPackageSerializer, ReviewSerializer, BookingSerializer, BookingDetailSerializer
from rest_framework import generics, permissions, status
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from requests.auth import HTTPBasicAuth
import requests
import base64
from datetime import datetime
from django_daraja.mpesa.core import MpesaClient
from django.views.decorators.csrf import csrf_exempt
import json
from requests.structures import CaseInsensitiveDict

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

mpesa_client = MpesaClient()

@csrf_exempt
def stk_push_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            phone_number = data.get('phone_number')
            amount = data.get('amount', 1)

            response = mpesa_client.stk_push(
                phone_number=phone_number,
                amount=amount,
                account_reference='Safari Payment',
                transaction_desc='Payment for Safari',
                callback_url='https://charming-crane-visually.ngrok-free.app/safari/daraja/callback/'
            )

            return JsonResponse({
                'status_code': response.status_code,
                'content': response.content.decode('utf-8')
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def mpesa_callback(request):
    if request.method == 'POST':
        try:
            print("Callback received")
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            result_code = data['Body']['stkCallback']['ResultCode']
            result_desc = data['Body']['stkCallback']['ResultDesc']

            if result_code == 0:
                items = data['Body']['stkCallback']['CallbackMetadata']['Item']
                receipt_number = next(item['Value'] for item in items if item['Name'] == 'MpesaReceiptNumber')
                phone_number = next(item['Value'] for item in items if item['Name'] == 'PhoneNumber')

                payment = Payment.objects.filter(phone_number=phone_number, transaction_id='').first()
                if payment:
                    payment.transaction_id = receipt_number
                    payment.save()
                    return JsonResponse({'message': 'Payment updated successfully'}, status=200)
                return JsonResponse({'error': 'Payment not found'}, status=404)
            elif result_code == '1032':
                return JsonResponse({'message': 'Payment canceled by user'}, status=400)
            else:
                items = data['Body']['stkCallback'].get('CallbackMetadata', {}.get('Item', []))
                phone_number = next((item['Value'] for item in data['Body']['stkCallback']['Item'] if item['Name'] == 'PhoneNumber'), None)
                Payment.objects.create(
                    phone_number=phone_number or 'Unknown',
                    transaction_id='Cancelled',
                    amount=0
                )
                return JsonResponse({'message': f'Transaction failed: {result_desc}'}, status=400)
    
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def save_payment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            safari_name = data.get('safari_name')

            safari = SafariPackage.objects.get(title=safari_name)

            Payment.objects.create(
                safari_package = safari,
                name=data.get('name'),
                email=data.get('email'),
                phone_number=data.get('phone_number'),
                amount=data.get('amount'),
                transaction_id=''
            )
            return JsonResponse({'message': 'Payment saved successfully!'}, status=201)
        except SafariPackage.DoesNotExist:
            return JsonResponse({'error': 'Safari package not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def payment_status(request, transaction_id):
    if request.method == 'GET':
        try:
            payment = Payment.objects.get(transaction_id=transaction_id)
            return JsonResponse({'transaction_id': payment.transaction_id, 'status': 'success'}, status=200)
        except Payment.DoesNotExist:
            return JsonResponse({'error': 'Payment not found'}, status=404)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)