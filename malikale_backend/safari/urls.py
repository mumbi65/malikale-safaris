from django.urls import path
from .views import SafariPackageListView, ReviewListCreateView, ReviewUpdateDeleteView, safari_detail_view, SafariReviewListView, create_booking, UserBookingsView

urlpatterns = [
    path('api/safari-packages/', SafariPackageListView.as_view(), name='safari-package-list'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewUpdateDeleteView.as_view(), name='review-update-delete'),
    path('api/safari/<int:safariId>/', safari_detail_view, name='safari-detail'),
    path('reviews/safari/<int:safari_id>/', SafariReviewListView.as_view(), name='safari-reviews-list'),
    path('api/bookings/', create_booking, name='create-booking'),
    path('api/booked/', UserBookingsView.as_view(), name='user-bookings'),
]