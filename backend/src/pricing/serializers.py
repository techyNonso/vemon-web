from rest_framework import serializers
from .models import pricing

class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = pricing
        fields = '__all__'