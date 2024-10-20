from django.contrib import admin
from .models import SafariPackage, Review, Booking

# Register your models here.
admin.site.register(SafariPackage)
admin.site.register(Review)
admin.site.register(Booking)
