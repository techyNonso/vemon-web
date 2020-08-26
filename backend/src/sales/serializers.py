from rest_framework import serializers
from .models import sale

class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = sale
        fields = '__all__'