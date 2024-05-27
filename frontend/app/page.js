'use client';

import styles from "./page.module.css";
import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const borderColorTemplate = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
];

let OpenStreetMap;
if (typeof window !== 'undefined') {
  OpenStreetMap = require('./module/openstreetmap').default;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState('');
  const [chartData, setChartData] = useState({
    labels: ['+1', '+2', '+3', '+4', '+5', '+6'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: borderColorTemplate[0],
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: borderColorTemplate[1],
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Predicted Data',
        font: {
          size: 30,
        },
      },
    },
  });
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const mapRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  function errorHandler() {
    // change Text of apt_name to "ERROR: NOT FOUND"
    graphController("ERROR: NOT FOUND", 0);
    mapController(37.5665, 126.978);
  }

  function searchHandler() {
    // fetch data from api
    // fetch(`http://localhost:3000/api/search?search=${search}`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setData(res);
    //     graphController();
    //   });
    // if (res.code = "error") {
    if (true) {
      errorHandler();
      // } else if (res.code = "ok") {
    } else if (true) {
      // { lat: 37.3665, lng: 126.878 }
      graphController("APT_NAME_001", 0);
      mapController(37.3665, 126.878);
    }
  }

  function graphController(apt_name, res) {
    // draw graph
    console.log(apt_name, res);
    console.log(chartRef.current);
    // change chart title to apt_name
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: apt_name,
          font: {
            size: 30,
          },
        },
      },
    });
    // change chart data to res
  }
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update(); 
    }
  }, [chartOptions, chartData]);

  function mapController(lat, lng) {
    setCenter({ lat: lat, lng: lng });
  }
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, 17, { duration: 1.5 });
    }
  }, [center]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>부동산 실거래가 예측</h1>
        <p>머신러닝을 이용한 부동산 실거래가 예측 플랫폼<br /> ``행정구 도로명 건물번호`` 입력하여 예측 실거래가를 확인 할 수 있습니다.</p>
      </div>
      <div className={styles.content}
        style={{ width: '100%' }}
      >
        {/* input and search button */}
        <div style={{ width: '100%', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
          <input type="text" placeholder="Search..." style={{ width: '50%', height: '36px', margin: '1em', padding: '0.2em' }} onChange={(e) => setSearch(e.target.value)} />
          <button style={{ width: '20%', height: '36px', margin: '1em', padding: '0.2em' }} onClick={searchHandler}>Search</button>
        </div>
        {/* graph */}
        <div style={{ width: '100%', height: '300px', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
          <Line options={chartOptions} data={chartData} ref={chartRef} />
        </div>
        {/* map */}
        <div>
          {isClient && OpenStreetMap && <div style={{ width: '100%', height: '500px' }}><OpenStreetMap mapRef={mapRef} /></div>}
        </div>
      </div>
    </main>
  );
}