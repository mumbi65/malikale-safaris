from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile
from django.contrib.auth.hashers import make_password

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):

        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='profile.phone', allow_blank=True)
    country = serializers.CharField(source="profile.country", allow_blank=True)


    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone', 'country', 'password')
        extra_kwargs = {
            'username': {'required': False},
            'password': {'required': False, 'allow_blank': True}
        }


    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile, created = Profile.objects.get_or_create(user=instance)

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        password = validated_data.get('password', None)
        if password:
            instance.password = make_password(password)
        instance.save()

       
        profile.phone = profile_data.get('phone', profile.phone)
        profile.country = profile_data.get('country', profile.country)
        profile.save()

        return instance