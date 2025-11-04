import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const locateIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Smooth recenter component
function RecenterMap({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 17, { duration: 1.5 }); // Smooth zoom + center
  }
  return null;
}

export default function MapView() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState(null);
  const mapContainerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      () => alert("Unable to retrieve your location")
    );
  };

  return (
    <div ref={mapContainerRef} className={`map-container ${isFullscreen ? "fullscreen" : ""}`}>
      <div className="map-header">
        <h5 className="fw-bold text-danger">🗺️ Find My Parking Spot</h5>
      </div>

      <div className="map-box position-relative">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={14}
          scrollWheelZoom={true}
          zoomControl={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User's live location */}
          {position && (
            <>
              <Marker position={position} icon={locateIcon}>
                <Popup>You are here 📍</Popup>
              </Marker>
              <RecenterMap position={position} />
            </>
          )}
        </MapContainer>

        {/* Floating Buttons */}
        <button className="floating-btn locate" onClick={locateUser} title="Locate Me">
          📍
        </button>
        <button
          className="floating-btn fullscreen-toggle"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? "🗕" : "🗖"}
        </button>
      </div>
    </div>
  );
}
