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