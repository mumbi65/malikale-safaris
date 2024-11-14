from django.contrib import admin
from .models import SafariPackage, Review, Booking, MpesaPayment, PayPalPayment, ContactMessage

# Register your models here.
admin.site.register(SafariPackage)
admin.site.register(Review)
admin.site.register(Booking)
admin.site.register(MpesaPayment)
admin.site.register(PayPalPayment)
admin.site.register(ContactMessage)
