from django.urls import path, include
from .views import SafariPackageListView, ReviewListCreateView, ReviewUpdateDeleteView, safari_detail_view, SafariReviewListView, create_booking, UserBookingsView, stk_push_view, mpesa_callback, payment_status, CuctomePasswordResetConfirmView, CustomPasswordResetView, savePayment, save_paypal_payment

urlpatterns = [
    path('api/safari-packages/', SafariPackageListView.as_view(), name='safari-package-list'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewUpdateDeleteView.as_view(), name='review-update-delete'),
    path('api/safari/<int:safariId>/', safari_detail_view, name='safari-detail'),
    path('reviews/safari/<int:safari_id>/', SafariReviewListView.as_view(), name='safari-reviews-list'),
    path('api/bookings/', create_booking, name='create-booking'),
    path('api/booked/', UserBookingsView.as_view(), name='user-bookings'),
    path('daraja/stk_push/', stk_push_view, name='stk-push'),
    path('daraja/callback/', mpesa_callback, name='callback'),
    path('payment-status/<str:checkout_request_id>/', payment_status, name='payment-status'),
    path('payment-status/<str:checkout_request_id>/', savePayment, name='save-payment'),
    path('save-paypal-payment/', save_paypal_payment, name='save-paypal-payment'),
    path('api/password-reset/', CustomPasswordResetView.as_view(), name='password-reset'),
    path('api/password-reset/confirm/<uidb64>/<token>/', CuctomePasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]