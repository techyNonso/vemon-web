from rest_framework import serializers
from .models import debtClearance


class DebtClearanceSerializer(serializers.ModelSerializer):
    class Meta:
        model= debtClearance
        fields = '__all__'




        