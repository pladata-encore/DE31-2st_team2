from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("real_estimate project")