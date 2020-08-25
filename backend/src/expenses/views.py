from django.shortcuts import render
from .models import expense
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ExpenseSerializer

# Create your views here.
@api_view(['GET','POST'])
def expenseHandler(request):
    if request.method == 'GET':
        expenses = expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ExpenseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#create api for    handeling each expense
@api_view(["GET","PUT","DELETE"])
def expenseDetail(request, pk):
    try:
        theExpense = expense.objects.get(pk=pk)
    except expense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ExpenseSerializer(theExpense)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ExpenseSerializer(theExpense,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        theExpense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
