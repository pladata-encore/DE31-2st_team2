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
│   ├── ~
│   └── 2024임대.csv
├── frontend
│   ├── app
│   │   ├── module
│   │   │   └── openstreetmap.js
│   │   ├── layout.js
│   │   └── page.js
│   └── package.json
├── django
│   └── real_estate
│       ├── config
│       ├── model
│       │   └── model.h5
│       ├── api
│       └── manage.py
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
cd django/real_estate
python manage.py runserver
```
5. Frontend 서버 빌드 후 실행
```bash
cd frontend
npm install
npm run build
npm run start
```

## 기능
- 사용자로부터 입력받은 주소("행정구 도로명주소 길번호")를 통해 해당 주소의 실거래가를 예측한다.
- 사용자로부터 입력받은 주소를 지도에 표시한다.
- 예측된 실거래가를 차트로 표시한다.

![image](/public/Animation.gif)

## 사용 자료
- 국가통계포털 지방지표(2014~2023)
- 국토교통부 실거래가 공개시스템(2014~2024)
- 공간융합 빅데이터 플랫폼 아파트 기준정보(2024.02)