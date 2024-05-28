from django.shortcuts import render
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy_setup import SessionLocal
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Predict
from .forms import PredictForm
from urllib import parse
import pandas as pd
import json

def index(request):
    return render(request, 'api/base.html')

@csrf_exempt
def predict(request):
    result = None
    error = None

    if request.method == 'POST':
        # return debug
        data = json.loads(request.body)
        print(data)
        # db 접속정보
        conn_info = {
             "HOST": "43.202.5.70",
             "PORT": "3306",
             "USER": "team2",
             "PASSWORD": parse.quote_plus('encore2@#'),
             "DATABASE": "2nd_db2"
                }        


        # db 접속정보 기반으로 엔진 생성
                # engine = create_engine()
        engine = create_engine((f"mysql://{conn_info['USER']}:{conn_info['PASSWORD']}@{conn_info['HOST']}:{conn_info['PORT']}/{conn_info['DATABASE']}"))

        # data 기반 동적 쿼리
        sql = f"select * from merged_data where gugun='{data['gugun']}' and road_name='{data['road_name']}' and road_num='{data['road_number']}'"
        
        search_df = pd.read_sql(sql, engine)

        

        apt_nm = search_df['danji_name'].unique()
        lng = search_df['lo'].unique()
        lat = search_df['la'].unique()
        size = search_df['size'].unique()
        data = []
        for s in size:
            # 모델 추론 시행
            # pre_data = model(eqwerq)
            
            t_da = {s: [0,]} # [0,]을 pre_data로 대체
            data.append(t_da)


        return_json = {
            "code" : "ok",
            "apt_nm": apt_nm[0],
            "lng" : lng[0],
            "lat" : lat[0],
            "size" : size[0],
            "data" : data
             }
        
        return JsonResponse(return_json)

        
