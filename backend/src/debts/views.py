from django.shortcuts import render
from .models import debt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DebtSerializer


#create view for company debts
@api_view(['GET'])
def debtsForCompany(request,company,branch):
    if request.method == "GET":
        debts = debt.objects.filter(companyId=company,branchId=branch)
        serializer = DebtSerializer(debts,many=True)
        return Response(serializer.data)



        
# create view for debts here
@api_view(['GET','POST'])
def debtHandler(request):


    if request.method == 'GET':
        debts = debt.objects.all()
        serializer = DebtSerializer(debts,many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = DebtSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Create your views for single debt here.
@api_view(["GET","PUT","DELETE"])
def debtDetail(request, pk):
    try:
        theDebt = debt.objects.get(pk=pk)
    except debt.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DebtSerializer(theDebt)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = DebtSerializer(theDebt,request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        theDebt.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)