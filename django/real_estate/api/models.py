from django.db import models
from sqlalchemy import Column, Integer,String
from sqlalchemy_setup import Base

# Create your models here.



class Predict(Base):
    __tablename__ = 'merged_data'

    gugun = Column(String,  primary_key=True, index=True)
    dong = Column(String)
    main_bunge = Column(Integer)
    sub_bunge = Column(Integer)
    road_name = Column(String,  primary_key=True, index=True)
    road_number = Column(String,  primary_key=True, index=True)
    danji_name = Column(String)
    build_year = Column(Integer)
    deal_monteh = Column(Integer)
    size = Column(Integer)
    avg_sale_price = Column(Integer)
    avg_rent_deposit_price = Column(Integer)
    hshld_cost = Column(Integer)
    lo = Column(Integer)
    la = Column(Integer)
    elvtr_cnt = Column(Integer)
    cctv_cnt = Column(Integer)
    resident_population = Column(Integer)
    net_migration = Column(Integer)
    average_age =Column(String)
    foreigner_population = Column(String)
    stress_cognition_rate = Column(Integer)
    subjective_health_level_cognition_rate = Column(Integer)
    high_risk_drinking_rate = Column(Integer)
    health_life_practice_rate = Column(Integer)
    obesity_rate = Column(String)
    elementary_school_teachers = Column(Integer)
    totprk_ecct = Column(Integer)
    elementary_school_students = Column(Integer)
    kindergarten_teachers = Column(Integer)
    kindergarten_students = Column(Integer)
    suicide_rate = Column(String)
    registered_disorder = Column(String)