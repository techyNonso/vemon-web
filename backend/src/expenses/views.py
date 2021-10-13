from django.shortcuts import render
from .models import expense
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import ExpenseSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from managerfront.utils import Util
from account.models import Account
from companies.models import company as company_model


# create view for company expenses
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def MyCompanyExpense(
    request, company, startyear, startmonth, startday, endyear, endmonth, endday
):
    start_date = "%d-%d-%d" % (startyear, startmonth, startday)
    end_date = "%d-%d-%d" % (endyear, endmonth, endday)

    if request.method == "GET":
        expenses = expense.objects.filter(
            companyId=company, date__range=[start_date, end_date]
        )
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)


# create view for company expenses
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def companyExpense(
    request, company, branch, startyear, startmonth, startday, endyear, endmonth, endday
):
    start_date = "%d-%d-%d" % (startyear, startmonth, startday)
    end_date = "%d-%d-%d" % (endyear, endmonth, endday)

    account = Account.objects.get(email=request.user)
    theCompany = company_model.objects.get(companyId=company)
    """
    if not account.is_admin and not Util.checkExpiration(theCompany.expiryDate):
        return Response({"rejection":"You need to clear all bills associated with "+theCompany.companyId +" before you can access this data."})
    """

    if request.method == "GET":
        expenses = expense.objects.filter(
            companyId=company, branchId=branch, date__range=[start_date, end_date]
        )
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)


# Create your views here.
@swagger_auto_schema(method="post", request_body=ExpenseSerializer)
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def expenseHandler(request):
    if request.method == "GET":
        expenses = expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ExpenseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# create api for    handeling each expense
@swagger_auto_schema(method="put", request_body=ExpenseSerializer)
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def expenseDetail(request, pk):
    try:
        theExpense = expense.objects.get(pk=pk)
    except expense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ExpenseSerializer(theExpense)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ExpenseSerializer(theExpense, request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        theExpense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
