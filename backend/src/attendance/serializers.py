from  rest_framework import serializers
from  .models import attendance



class AttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = attendance
       # fields = ['staffId', 'staffName', 'arrivalTime','exitTime']
        fields = '__all__'