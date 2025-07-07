from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.http import JsonResponse, HttpResponse

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]

class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        }


# Show, Create, Delete Sale
@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
        # Check to see if vin (unique identifier) from Automobile is present in Sale
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        # Check to see if employee id (unique identifier) from Salesperson is present in Sale
            employee_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            content["salesperson"] = salesperson
        # Check to see if id (unique identifier) from Customer is present in Sale
            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Vin does not exist"},
                status=400,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=400,
        )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
        )

        sale = Sale.objects.create(**content)
        return JsonResponse(
        {"sale": sale},
        encoder=SalesEncoder,
        safe=False,
    )

@require_http_methods(["DELETE"])
def api_delete_sale(request):
    if request.method == "DELETE":
        content = json.loads(request.body)
        id = content["id"]
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return HttpResponse(status=204)
        except Sale.DoesNotExist:
                return JsonResponse({"message": "Sale not found"}, status=404)

#####
# CUSTOMERS GET, POST, DELETE
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
    )
@require_http_methods(["DELETE"])
def api_customer_delete(request, id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})
#####
# Salesperson GET, POST, DELETE
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
    )
@require_http_methods(["DELETE"])
def api_delete_salespeople(request, id):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Salesperson does not exist"})
#####
