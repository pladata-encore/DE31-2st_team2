'use client';

import styles from "./page.module.css";
import React, { useEffect, useState } from "react";

let OpenStreetMap;
if (typeof window !== 'undefined') {
  OpenStreetMap = require('./module/openstreetmap').default;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function searchHandler() {
    // fetch data from api
  }

  function graphDrawing() {
    // draw graph
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>부동산 실거래가 예측</h1>
        <p>머신러닝을 이용한 부동산 실거래가 예측 플랫폼<br/> ``행정구 도로명 건물번호`` 입력하여 예측 실거래가를 확인 할 수 있습니다.</p>
      </div>
      <div className={styles.content}
        style={{ width: '100%' }}
      >
        {/* input and search button */}
        <div style={{ width: '100%', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
          <input type="text" placeholder="Search..." style={{ width: '50%', height: '36px', margin: '1em', padding: '0.2em'}} />
          <button style={{ width: '20%', height: '36px', margin: '1em', padding: '0.2em' }}>Search</button>
        </div>
        {/* graph */}
        <div style={{ width: '100%', height: '200px', alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
          <h1>GRAPH AREA</h1>
        </div>
        {/* map */}
        <div>
          {isClient && OpenStreetMap && <div style={{ width: '100%', height: '500px' }}><OpenStreetMap /></div>}
        </div>
      </div>
    </main>
  );
}