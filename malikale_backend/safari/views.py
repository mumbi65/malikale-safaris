from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SafariPackage, Review
from .serializers import SafariPackageSerializer, ReviewSerializer
from rest_framework import generics, permissions
from django.http import JsonResponse

# Create your views here.

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
        return Review.objects.filter(user=self.request.user)

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