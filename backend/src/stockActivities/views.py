from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import stockActivity
from .serializers import StockActivitySerializer



# Create your views here.
@api_view(['GET','POST'])
def stockActivityHandler(request):
    if request.method == "GET":
        allActivity = stockActivity.objects.all()
        serializer = StockActivitySerializer(allActivity, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StockActivitySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#create your staff detail view
@api_view(['GET','PUT','DELETE'])
def stockActivityDetail(request, pk):
    try:
        theActivity = stockActivity.objects.get(pk=pk)
    except staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = StockActivitySerializer(theActivity)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StockActivitySerializer(theActivity,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theActivity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)