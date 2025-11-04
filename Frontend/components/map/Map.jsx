// Map.jsx
import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const FitBounds = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds && bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
};

const ParkingRouteToDestination = ({ selectedDestination }) => {
    const [userLoc, setUserLoc] = useState(null);
    const [destCoords, setDestCoords] = useState(null);
    const [parkings, setParkings] = useState([]);
    const [route, setRoute] = useState([]);
    const [loading, setLoading] = useState(false);

    const ORS_API_KEY = import.meta.env.VITE_ORS_API;

    const destinations = {
        mantri: { name: "Mantri Mall", lat: 12.9916, lon: 77.5712 },
        orion: { name: "Orion Mall", lat: 13.011053, lon: 77.554939 },
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLoc([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (!selectedDestination || !userLoc) return;

        const dest = destinations[selectedDestination];
        setDestCoords([dest.lat, dest.lon]);

        const delta = 0.0045;
        const fakeParkings = [
            {
                id: 1,
                name: "Parking A",
                lat: dest.lat + delta / 2,
                lon: dest.lon + delta / 2,
            },
            {
                id: 2,
                name: "Parking B",
                lat: dest.lat - delta / 3,
                lon: dest.lon + delta / 3,
            },
            {
                id: 3,
                name: "Parking C",
                lat: dest.lat + delta / 4,
                lon: dest.lon - delta / 4,
            },
        ];
        setParkings(fakeParkings);

        const nearest = getNearestSpot(fakeParkings, dest.lat, dest.lon);
        getRouteToParking(nearest.lat, nearest.lon);
    }, [selectedDestination, userLoc]);

    const getNearestSpot = (spots, destLat, destLon) => {
        let minDist = Infinity;
        let nearest = null;
        for (let spot of spots) {
            const d = Math.sqrt(
                Math.pow(spot.lat - destLat, 2) +
                    Math.pow(spot.lon - destLon, 2)
            );
            if (d < minDist) {
                minDist = d;
                nearest = spot;
            }
        }
        return nearest;
    };

    const getRouteToParking = async (destLat, destLon) => {
        if (!userLoc) return;
        setLoading(true);

        const body = {
            coordinates: [
                [userLoc[1], userLoc[0]],
                [destLon, destLat],
            ],
        };

        try {
            const res = await axios.post(
                "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
                body,
                {
                    headers: {
                        Authorization: ORS_API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            const coords = res.data.features[0].geometry.coordinates.map(
                ([lon, lat]) => [lat, lon]
            );
            setRoute(coords);
        } catch (err) {
            console.error("Error fetching route from ORS:", err);
            setRoute([userLoc, [destLat, destLon]]);
        } finally {
            setLoading(false);
        }
    };

    const destinationIcon = new L.Icon({
        iconUrl: "/red_marker.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
    });

    const parkingIcon = new L.Icon({
        iconUrl: "/yellow_marker.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -30],
    });

    const userIcon = new L.Icon({
        iconUrl: "/blue_marker.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -30],
    });

    if (!userLoc) return <p>Getting your location...</p>;

    const allCoords = [];
    if (userLoc) allCoords.push(userLoc);
    if (destCoords) allCoords.push(destCoords);
    if (route.length > 0) allCoords.push(...route);

    return (
        <div style={{ position: "relative", height: "100%" }}>
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        zIndex: 1000,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                    }}
                >
                    Loading route...
                </div>
            )}

            <MapContainer
                center={userLoc}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={userLoc} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>

                {destCoords && (
                    <Marker position={destCoords} icon={destinationIcon}>
                        <Popup>{destinations[selectedDestination].name}</Popup>
                    </Marker>
                )}

                {parkings.map((spot) => (
                    <Marker
                        key={spot.id}
                        position={[spot.lat, spot.lon]}
                        icon={parkingIcon}
                    >
                        <Popup>{spot.name}</Popup>
                    </Marker>
                ))}

                {route.length > 0 && (
                    <Polyline positions={route} color="blue" weight={4} />
                )}

                {allCoords.length > 0 && <FitBounds bounds={allCoords} />}
            </MapContainer>
        </div>
    );
};

export default ParkingRouteToDestination;
