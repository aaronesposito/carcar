from django.urls import path
from .views import api_sales, api_customer_delete, api_list_customers, api_list_salespeople, api_delete_salespeople

urlpatterns = [
    path("sales/", api_sales, name="api_sales"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_customer_delete, name="api_customer_delete"),
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:id>/", api_delete_salespeople, name="api_delete_salespeople"),
]
