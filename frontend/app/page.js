'use client';

import styles from "./page.module.css";
import React, { useEffect, useState, useRef } from "react";
import jQuery from "jquery";
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

  function getCookies(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  } // end of getCookies

  function errorHandler(code) {
    if (code === "syntax") {
      // change Text of apt_name to "ERROR: SYNTAX ERROR"
      graphController("ERROR: SYNTAX ERROR", 0);
      mapController(37.5665, 126.978);
    } else if (code === "notfound") {
      // change Text of apt_name to "ERROR: NOT FOUND"
      graphController("ERROR: NOT FOUND", 0);
      mapController(37.5665, 126.978);
    }
  } // end of errorHandler

  function searchHandler() {
    if (search === '') {
      errorHandler("notfound");
    } else {
      var split_search_data = search.split(' ');
      if (split_search_data.length != 3) {
        errorHandler("syntax");
        return;
      }
      // POST request to api server
      // var url = 'http://localhost:8000/api/predict';
      var url = 'https://48ec-221-151-189-183.ngrok-free.app/api/predict/';
      var data = {
        'gugun': split_search_data[0],
        'road_name': split_search_data[1],
        'road_number': split_search_data[2]
      };

      // get csrf token
      var csrftoken = getCookies('csrftoken');


      // evade CORS policy and fetch data
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        console.log(data);
        graphController(data['apt_nm'], data['data']);
        mapController(data['lat'], data['lng']);
      })
      .catch(error => {
        console.error(error);
        errorHandler("notfound");
      });


    }
  } // end of searchHandler

  function graphController(apt_name, res) {
    console.log("input graph data", apt_name, res)
    // draw graph
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
    let res_dataset = [];
    var res_values = Object.values(res);
    for (let i = 0; i < res.length; i++) {
      res_dataset.push({
        label: Object.keys(res_values[i]) + '평방미터(m^2)',
        data: [10000 + (i*1000),11000 + (i*1000),12000 + (i*1000),13000 + (i*1000),14000 + (i*1000),15000 + (i*1000)],  //res_values[i],
        borderColor: borderColorTemplate[i%6],
      });
    }
    setChartData({
      labels: ['+1', '+2', '+3', '+4', '+5', '+6'],
      datasets: res_dataset,
    });

  } // end of graphController
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [chartOptions, chartData]);

  function mapController(lat, lng) {
    console.log("input map data", lat, lng)
    setCenter({ lat: lat, lng: lng });
  } // end of mapController
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