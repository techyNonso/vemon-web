# Create your views here.
from django.shortcuts import render
from .models import pricing
from .serializers import PricingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated


#get pricing 
@swagger_auto_schema(method='post',request_body=PricingSerializer)
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def priceList(request):
    if request.method == "GET":
        price_list = pricing.objects.all()
        serializer = PricingSerializer(price_list, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = PricingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       



#single pricing detail
@swagger_auto_schema(method='put',request_body=PricingSerializer)
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def priceDetail(request, pk):
    try:
        price = pricing.objects.get(pk=pk)
    except price.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = PricingSerializer(price)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PricingSerializer(price,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        price.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)