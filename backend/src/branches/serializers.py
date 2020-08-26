from rest_framework import serializers
from .models import branch

class BranchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = branch
        fields = '__all__'