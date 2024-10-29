from django.urls import path, include
from .views import SafariPackageListView, ReviewListCreateView, ReviewUpdateDeleteView, safari_detail_view, SafariReviewListView, create_booking, UserBookingsView, stk_push_view, mpesa_callback, save_payment, payment_status

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
    path('save-payment/', save_payment, name='save-payment'),
    path('payment-status/<transaction_id>/', payment_status, name='payment-status'),
]