from django import forms
from .models import Predict

class PredictForm(forms.Form):
    model = Predict
    fields = ['gugun', 'road_name', 'road_number']
    labels = {'gugun' : '구',
              'road_name' : '도로명',
              'road_number' : '도로번호'
              }