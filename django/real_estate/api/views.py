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
from datetime import datetime
from tensorflow.keras.models import load_model
import pandas as pd
import json

# load model
model = load_model('../model/trained_model.h5')

def preprocessing(data, d_m_list, this_size):
    # preprocessing
    data['average_age'] = data['average_age'].replace({'-': np.nan})
    data['average_age'] = data['average_age'].astype(float)
    data['suicide_rate'] = data['suicide_rate'].replace({'-': np.nan})
    data['suicide_rate'] = data['suicide_rate'].astype(float)

    # get labelencoder object
    import json

    with open('../model/encoding_table_gugun.json', 'r') as f:
        encoding_table_gugun = json.load(f)
    with open('../model/encoding_table_dong.json', 'r') as f:
        encoding_table_dong = json.load(f)
    with open('../model/encoding_table_road.json', 'r') as f:
        encoding_table_road = json.load(f)

    # do label encoding
    data['gugun'] = data['gugun'].map(encoding_table_gugun)
    data['dong'] = data['dong'].map(encoding_table_dong)
    data['road_name'] = data['road_name'].map(encoding_table_road)

    # drop columns
    drop_columns = ['main_bunge', 'sub_bunge', 'danji_name', 'road_num', 'build_year', 'lo', 'la', 'elementary_school_teachers', 'elementary_school_students', 'kindergarten_teachers', 'kindergarten_students']
    data.drop(drop_columns, axis=1, inplace=True)

    # get sub_data from data
    data_sorted = data.sort_values('deal_month', ascending=False)
    first_row = data_sorted.iloc[0]
    first_row.drop(['deal_month', 'size', 'avg_sale_price'], inplace=True)

    # make dataframe for prediction
    prediction_data = pd.concat([first_row]*6, axis=1).T
    prediction_data['deal_month'] = d_m_list
    prediction_data['size'] = this_size
    prediction_data = prediction_data[['gugun', 'dong', 'road_name', 'deal_month', 'size', 'avg_rent_deposit_price', 'hshld_cost', 'elvtr_cnt', 'totprk_ecct', 'cctv_cnt', 'resident_population', 'net_migration', 'average_age', 'foreigner_population', 'stress_cognition_rate', 'subjective_health_level_cognition_rate', 'high_risk_drinking_rate', 'health_life_practice_rate', 'suicide_rate', 'building_age', 'elvtr_ratio', 'prk_ratio', 'cctv_ratio', 'foreigner_ratio', 'student_teacher_ratio']]

    return prediction_data

def index(request):
    return render(request, 'api/base.html')

@csrf_exempt
def predict(request):
    result = None
    error = None

    # from today to 6 months after (per month) [today+1month, today+2months, ...]
    today = datetime.today()
    deal_month_list = [(today + pd.DateOffset(months=i) - datetime(1970, 1, 1)).total_seconds() for i in range(7)][1:]

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
            prediction_data = preprocessing(search_df, deal_month_list, s)

            # 모델 추론
            prediction = model.predict(prediction_data)
            
            t_da = {s: prediction} # [0,]을 pre_data로 대체
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
