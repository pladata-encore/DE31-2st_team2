# DE31-2st_team2 부동산 실거래가 예측

## 프로젝트 목표
- 서울시의 최근 10년간의 실거래가 데이터(2014.01~2024.04)와 간접적인 사회 데이터를 활용하여 부동산 가격을 예측하는 모델을 개발하고 이를 표현하는 웹 페이지를 구현한다.

## Project 환경
- Python 3.10.13
- Node.js 20(lts)

## Project 구조
```
.
├── seoul_real_estate
│   ├── 2014매매.csv
│   ├── 2014임대.csv
│   ├── ~
│   ├── 2024매매.csv
│   └── 2024임대.csv
├── frontend
│   ├── app
│   │   ├── module
│   │   │   └── openstreetmap.js
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   └── package.json
├── django
│   ├── model
│   │   └── model.h5
│   ├── api
│   │   ├── urls.py
│   │   └── views.py
│   └── manage.py
├── preprocessing.ipynb
├── README.md
└── requirements.txt
```

## Pre-requisite (사전 준비)
1. Python 3.10.13, Node.js 20(lts) 설치
2. ``requirements.txt`` 를 통해 필요한 라이브러리 설치
```bash
pip install -r requirements.txt
```
3. npm을 통해 필요한 라이브러리 설치
```bash
cd frontend
npm install
```
4. Django 서버 실행
```bash
cd django
python manage.py runserver
```
5. Frontend 서버 빌드 후 실행
```bash
cd frontend
npm run build
npm run start
```

## 사용 자료
- 국가통계포털 지방지표(2014~2023)
- 국토교통부 실거래가 공개시스템(2014~2024)