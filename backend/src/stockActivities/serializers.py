from rest_framework import serializers
from .models import stockActivity

class StockActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = stockActivity
        fields = '__all__'