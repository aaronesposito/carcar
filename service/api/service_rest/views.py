from django.http import JsonResponse
from django.shortcuts import render
import json
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]
    

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'id',
        "vin",
        "customer",
        "datetime",
        "technician",
        "reason",
    ]
    encoders = {
        "technician":TechnicianEncoder(),
    }
    def get_extra_data(self, o):
        return {"status": o.status.name}


@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            employee_id = content["technician"]
            technician = Technician.objects.get(employee_id=employee_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status=400,
            )

        appointment = Appointment.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(['GET', 'DELETE'])
def api_appointment_detail(request, id):
    if request.method == 'GET':
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
            {"message":"Invalid appointment ID"},
            status=400
            )
    else:
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.cancel()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
            return JsonResponse(
            {"message":"Invalid appointment ID"},
            status=400
            )
        

@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.finish()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
            return JsonResponse(
            {"message":"Invalid appointment ID"},
            status=400
            )


@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    

@require_http_methods(['DELETE'])
def api_technician_delete(request, id):
    count, _ = Technician.objects.filter(id=id).delete()
    if count > 0:
        return JsonResponse({"deleted": count > 0})
    else:
        return JsonResponse(
            {"message":"Invalid technician ID"},
            status=400
            )


@require_http_methods(['GET'])
def api_list_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVODetailEncoder
        )
