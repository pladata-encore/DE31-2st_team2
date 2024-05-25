# DE31-2st_team2 부동산 실거래가 예측

## 프로젝트 목표
- 서울시의 최근 10년간의 실거래가 데이터(2014.01~2024.04)를 활용하여 부동산 가격을 예측한다.

## Project 환경
- Python 3.10.13

## Project 구조
```
.
├── seoul_real_estate
│   ├── 2014매매.csv
│   ├── 2014임대.csv
│   ├── ~
│   ├── 2024매매.csv
│   └── 2024임대.csv
├── README.md
└── requirements.txt
```

## Pre-requisite (사전 준비)
1. Python 3.10.13 설치 
2. ``requirements.txt`` 를 통해 필요한 라이브러리 설치
```bash
pip install -r requirements.txt
```

## 사용 자료
- 국가통계포털 지방지표(2014~2023)
- 국토교통부 실거래가 공개시스템(2014~2024)