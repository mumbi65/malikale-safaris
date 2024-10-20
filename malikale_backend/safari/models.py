from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class SafariPackage(models.Model):
    title = models.CharField(max_length=255)
    duration = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    description = models.TextField()
    people = models.CharField(max_length=50)
    overview = models.TextField()
    image = models.ImageField(upload_to='safari_images/', blank=True, null=True)
    image2 = models.ImageField(upload_to='safari_images/', blank=True, null=True)
    highlights = models.JSONField()
    itinerary = models.JSONField()
    map_embed_url = models.URLField()


    def __str__(self):
        return self.title
    

class Review(models.Model):
    safari = models.ForeignKey(SafariPackage, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - {self.safari.title}'
    


class Booking(models.Model):
    safari = models.ForeignKey(SafariPackage, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=255)
    email = models.EmailField()
    country = models.CharField(max_length=100)
    contactNumber = models.CharField(max_length=15)
    adults = models.PositiveIntegerField()
    children = models.PositiveIntegerField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    bookingDate = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fullname} - {self.subject}"

