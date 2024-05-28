from django.apps import AppConfig
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'



@api_view(['GET'])
def hello_rest_api(request):
    data = {'message': 'Hello, REST API!'}
    return Response(data)