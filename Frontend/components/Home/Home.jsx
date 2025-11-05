// Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import ParkingRouteToDestination from "../map/Map";
import { BASE_URL } from "../config";
import "./Home.css";

export default function Home() {
    const [destination, setDestination] = useState("mantri");
    const [vehicleType, setVehicleType] = useState("car");
    const [showMap, setShowMap] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [availableData, setAvailableData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [amount, setAmount] = useState(null);

    const mapSectionRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMap(true);
        setAvailableData(null);
        setError("");
        setAmount(null);

        // Scroll to map section smoothly
        setTimeout(() => {
            mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleBookSpot = async () => {
        setIsLoading(true);
        setError("");
        setAvailableData(null);
        setAmount(null);

        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if (!token || !userId) {
                setError("Please log in to book a parking spot.");
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${BASE_URL}/parking/book_spot`,
                { userId, vehicleType },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAvailableData(response.data);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Error booking parking spot."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeave = async () => {
        setIsLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setError("User ID not found.");
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${BASE_URL}/parking/leave_spot`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAmount(response.data.amount);
            setAvailableData(null);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Error leaving parking spot."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Home Section */}
            <section className="home-section" id="home">
                <div className="overlay">
                    <Container className="text-center d-flex flex-column justify-content-center align-items-center h-100">
                        <h1 className="title fw-bold mb-4" id="home">
                            Find Parking Smarter with{" "}
                            <span
                                className="brand"
                                style={{ fontSize: "50px" }}
                            >
                                Nexteer
                            </span>
                        </h1>

                        <Form
                            onSubmit={handleSubmit}
                            className="search-box w-100"
                        >
                            <Form.Group className="mb-3 w-50 mx-auto">
                                <Form.Label>Select Destination</Form.Label>
                                <Form.Select
                                    value={destination}
                                    onChange={(e) =>
                                        setDestination(e.target.value)
                                    }
                                >
                                    <option value="mantri">Mantri Mall</option>
                                    <option value="orion">Orion Mall</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 w-50 mx-auto">
                                <Form.Label>Select Vehicle Type</Form.Label>
                                <Form.Select
                                    value={vehicleType}
                                    onChange={(e) =>
                                        setVehicleType(e.target.value)
                                    }
                                >
                                    <option value="car">Car</option>
                                    <option value="two wheeler">
                                        Two Wheeler
                                    </option>
                                    <option value="truck">Truck</option>
                                    <option value="auto">Auto</option>
                                </Form.Select>
                            </Form.Group>

                            <Button
                                type="submit"
                                className="find-btn fw-bold mt-3 px-5 py-3"
                                variant="danger"
                            >
                                Find Parking
                            </Button>
                        </Form>

                        {error && <p className="text-danger mt-3">{error}</p>}
                    </Container>
                </div>
            </section>

            {/* Map Section */}
            {showMap && (
                <section
                    className="map-display-section fade-in"
                    ref={mapSectionRef}
                >
                    <div className="map-preview">
                        <ParkingRouteToDestination
                            selectedDestination={destination}
                        />
                    </div>

                    {/* Buttons below map */}
                    {isLoggedIn && (
                        <div className="buttons-container">
                            <Button
                                variant="success"
                                onClick={handleBookSpot}
                                disabled={isLoading}
                                className="fw-bold px-5 py-2"
                            >
                                {isLoading ? "Booking..." : "Book Spot"}
                            </Button>

                            {availableData && (
                                <Button
                                    variant="warning"
                                    onClick={handleLeave}
                                    disabled={isLoading}
                                    className="fw-bold px-5 py-2"
                                >
                                    {isLoading ? "Processing..." : "Leave"}
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Parking Info */}
                    {availableData && (
                        <div className="info-box mt-3">
                            <h5 className="fw-bold text-success">
                                Parking Spot Booked!
                            </h5>
                            <p className="mb-1">
                                Available Spots: {availableData.availableCount}
                            </p>
                            <p>
                                Assigned Slot Index:{" "}
                                {availableData.assignedSlots.join(", ")}
                            </p>
                        </div>
                    )}

                    {/* Amount to pay */}
                    {amount !== null && (
                        <div className="info-box mt-3 border border-success">
                            <h5 className="fw-bold text-success">
                                Amount to Pay: ₹{amount}
                            </h5>
                        </div>
                    )}
                </section>
            )}
        </>
    );
}
