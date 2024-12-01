from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SafariPackage, Review, Booking, MpesaPayment, PayPalPayment, ContactMessage
from .serializers import SafariPackageSerializer, ReviewSerializer, BookingSerializer, BookingDetailSerializer, ContactMessageSerializer
from rest_framework import generics, permissions, status
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from requests.auth import HTTPBasicAuth
import requests
import base64
from datetime import datetime
from django_daraja.mpesa.core import MpesaClient
from django.views.decorators.csrf import csrf_exempt
import json
from requests.structures import CaseInsensitiveDict
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView
from django.urls import reverse_lazy
import logging
from django.utils.timezone import now
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator


# Create your views here.
def safari_list_view(request):
    safaris = SafariPackage.objects.all().values('id', 'title')
    return JsonResponse(list(safaris), safe=False)

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
    


@api_view(['POST'])
@permission_classes([AllowAny])
def contact_us(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message sent successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# forgot password logic
@method_decorator(csrf_exempt, name='dispatch')
class CustomPasswordResetView(PasswordResetView):
    email_template_name = 'registration/password_reset_email.html'
    success_url = reverse_lazy('password_reset_done')

    def form_valid(self, form):
        self.send_mail(
            subject_template_name=self.subject_template_name,
            email_template_name=self.email_template_name,
            context=self.get_context_data(),
            to_email=form.cleaned_data["email"]
        )
        return JsonResponse({"message": "Password reset email sent successfully."})
    

class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    success_url = reverse_lazy('password_reset_complete')

    def form_valid(self, form):
        form.save()
        return JsonResponse({"message": "Password has been reset successfully."})
    


def csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


# paypal logic
logger = logging.getLogger(__name__)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def save_paypal_payment(request):
    if request.method == 'POST':
        data = request.data
        logger.debug(f"Received payment data: {data}")

        order_id = data.get('orderID')
        payer_id = data.get('payerID')
        amount = data.get('amount')
        currency = data.get('currency')
        status_value = data.get('status')
        buyer_first_name = data.get('buyerFirstName')
        buyer_last_name = data.get('buyerLastName')

        if not all([order_id, payer_id, amount, currency, status_value]):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            paypalPayment = PayPalPayment.objects.create(
                order_id=order_id,
                payer_id=payer_id,
                amount=amount,
                currency=currency,
                status=status_value,
                buyer_first_name=buyer_first_name,
                buyer_last_name=buyer_last_name,
            )

            logger.info("Payment saved successfully: %s", paypalPayment) 
            return JsonResponse({"message": "Payment saved successfully"}, status=201)
        except KeyError as e:
            return JsonResponse({"error": f"Missing field: {str(e)}"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

    

# safaricom mpesa logic

mpesa_client = MpesaClient()

@csrf_exempt
def stk_push_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print("Incoming data:", data)

            safari_package_id = data.get('safari_package_id')
            if not safari_package_id:
                return JsonResponse({'error': 'safari_package_id is required'}, status=400)


            phone_number = data.get('phone_number')
            amount = data.get('amount', 1)
            name = data.get('name')
            email = data.get('email')

            safari_package = SafariPackage.objects.get(id=safari_package_id)

            response = mpesa_client.stk_push(
                phone_number=phone_number,
                amount=amount,
                account_reference='Safari Payment',
                transaction_desc='Payment for Safari',
                callback_url='https://malikale-safaris.onrender.com/safari/daraja/callback/'
            )

            print(response.content) 

            content = json.loads(response.content.decode('utf-8'))

            if response.status_code == 200 and content['ResponseCode'] == '0':
                checkout_request_id = content['CheckoutRequestID']

                MpesaPayment.objects.create(
                    safari_package=safari_package,
                    name=name,
                    email=email,
                    phone_number=phone_number,
                    amount=amount,
                    checkout_request_id=checkout_request_id,
                    status='pending',
                    # created_at=now()
                )

                return JsonResponse({
                    'message': 'STK push initiated',
                    'CheckoutRequestID': content['CheckoutRequestID'],
                    'ResponseCode': content.get('ResponseCode') 
                }, status=200)
            
            return JsonResponse({'error': content.get('CustomerMessage', 'Failed to initiate payment')}, status=400)
        
        except SafariPackage.DoesNotExist:
            return JsonResponse({'error': 'Safari package not found'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON in Mpesa response'}, status=500)

        except Exception as e:
            print(f"Error in STK Push: {e}")
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def mpesa_callback(request):
    if request.method == 'POST':
        try:
            print("Callback received")
            data = json.loads(request.body.decode('utf-8'))
            print("Parsed Data:", data)

            if 'Body' not in data or 'stkCallback' not in data['Body']:
                print("Invalid callback structure.")
                return JsonResponse({'error': 'Invalid callback structure'}, status=400)
            
            stk_callback = data['Body']['stkCallback']
            # safari_package_id = data['Body'].get('safari_package_id')
            # name = data.get('name')
            # email = data.get('email')
            # phone_number = data.get('phone_number')
            # amount = data.get('amount')

            result_code = stk_callback.get('ResultCode', None)
            result_desc = stk_callback.get('ResultDesc', '')
            checkout_request_id = stk_callback.get('CheckoutRequestID', '')

            print(f"Result Code: {result_code}, Result Description: {result_desc}")

            payment = MpesaPayment.objects.get(checkout_request_id=checkout_request_id)

            if result_code == 0:
                # payment_saved = savePayment(stk_callback, safari_package_id, name, email, phone_number, amount, data)

                # if payment_saved:
                #     return JsonResponse({'message': 'Payment success notification sent'}, status=200)
                
                # else:
                #     return JsonResponse({'error': 'Failed to save payment'}, status=500)

                receipt_number = next(
                    (item['Value'] for item in stk_callback['CallbackMetadata']['Item'] if item['Name'] == 'MpesaReceiptNumber'), None
                )

                payment.transaction_id = receipt_number
                payment.status = 'success'
                payment.save()

                return JsonResponse({'message': 'Payment recorded successfully'}, status=200)
            
            elif result_code == 1032:
                payment.status = 'canceled'
                payment.save()

                return JsonResponse({'message': 'Payment canceled by user', 'status': 'canceled'}, status=200)
            
            payment.status = 'failed'
            payment.save()
            return JsonResponse({'message': f'Payment failed: {result_desc}'}, status=400)
        
        except MpesaPayment.DoesNotExist:
            return JsonResponse({'error': 'Payment not found'}, status=404)
    
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# def savePayment(stk_callback, safari_package_id, name, email, phone_number, amount, data):
#     checkout_request_id = stk_callback.get('CheckoutRequestID', '')
#     receipt_number = next(
#         (item['Value'] for item in stk_callback['CallbackMetadata']['Item'] if item['Name'] == 'MpesaReceiptNumber'), None
#     )

#     print(f"Attempting to save payment for CheckoutRequestID: {checkout_request_id}")

#     if receipt_number:
#         try:
                    
#             print("Saving receipt number: {receipt_number}")

#             if safari_package_id:
#                 safari_package = SafariPackage.objects.get(id=safari_package_id)
#             else:
#                 print("Warning: safari_package_id not found in callback data")

#             MpesaPayment.objects.create(
#                 safari_package=safari_package,
#                 name=name,
#                 email=email,
#                 phone_number=phone_number,
#                 amount=amount,
#                 transaction_id=receipt_number,
#                 checkout_request_id=checkout_request_id,
#                 status='success'
#             )

#             print(f"Payment saved successfully for CheckoutRequestID: {checkout_request_id}")
#             return True  # Payment saved successfully
#         except SafariPackage.DoesNotExist:
#             print(f"Safari package with ID {safari_package_id} does not exist.")
#         except Exception as e:
#             print(f"Error saving payment: {str(e)}")

#     return False



@csrf_exempt
def payment_status(request, checkout_request_id):
    print(f"Received request for checkout_request_id: {checkout_request_id}")
    if request.method == 'GET':
        try:
            payment = MpesaPayment.objects.get(checkout_request_id=checkout_request_id)
            print(f"Found payment: {payment}")
            if payment:
                # status = 'success' if payment.transaction_id else 'pending'
                return JsonResponse({
                'transaction_id': payment.transaction_id,
                  'status': payment.status
                  }, status=200)
        except MpesaPayment.DoesNotExist:
            print(f"Payment not found for CheckoutRequestID: {checkout_request_id}")
            return JsonResponse({'error': 'Payment not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)