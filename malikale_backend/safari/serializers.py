from rest_framework import serializers
from .models import SafariPackage, Review

class SafariPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SafariPackage
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    safariName = serializers.CharField(source='safari.title', read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'username', 'user', 'safari', 'safariName', 'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']