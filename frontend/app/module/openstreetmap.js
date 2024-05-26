import React, { useState, useRef } from "react";

// import openstreetmap api
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const OpenStreetMap = () => {
  // declare center and setCenter at seoul
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef(null);

  // declare map container and tile layer display size to 100%
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={mapContainerStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        

      </MapContainer>
    </>
  )
}
export default OpenStreetMap;