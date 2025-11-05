import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import ParkingRouteToDestination from "../map/Map";
import { BASE_URL } from "../config";

export default function Home() {
    const [destination, setDestination] = useState("mantri");
    const [showMap, setShowMap] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [availableData, setAvailableData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [amount, setAmount] = useState(null);

    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // Show map when user clicks "Find Parking"
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMap(true);
        setAvailableData(null);
        setError("");
        setAmount(null);
    };

    // Book parking spot via API
    const handleBookSpot = async () => {
        setIsLoading(true);
        setError("");
        setAvailableData(null);
        setAmount(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to book a parking spot.");
                setIsLoading(false);
                return;
            }

            const userId = localStorage.getItem("userId"); // assume stored on login
            if (!userId) {
                setError("User ID not found.");
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${BASE_URL}/parking/book_spot`,
                { userId },
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

    // Leave parking via API
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
        <section className="home-section">
            <div className="overlay">
                <Container className="text-center d-flex flex-column justify-content-center align-items-center h-100">
                    <h1 className="title fw-bold mb-4">
                        Find Parking Smarter with{" "}
                        <span className="brand">Nexteer</span>
                    </h1>

                    {/* Step 1: Find parking */}
                    <Form onSubmit={handleSubmit} className="search-box w-100">
                        <Form.Group className="mb-3 w-50 mx-auto">
                            <Form.Label>Select Destination</Form.Label>
                            <Form.Select
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            >
                                <option value="mantri">Mantri Mall</option>
                                <option value="orion">Orion Mall</option>
                            </Form.Select>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="find-btn fw-bold mt-4 px-5 py-3"
                            variant="danger"
                        >
                            Find Parking
                        </Button>
                    </Form>

                    {/* Step 2: Show map after finding parking */}
                    {showMap && (
                        <>
                            <div
                                style={{
                                    width: "85%",
                                    maxWidth: "1200px",
                                    height: "500px",
                                    margin: "40px auto",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                                    border: "2px solid #ddd",
                                }}
                            >
                                <ParkingRouteToDestination
                                    selectedDestination={destination}
                                />
                            </div>

                            {/* Step 3: Show booking & leave buttons if logged in */}
                            {isLoggedIn && (
                                <div className="mt-4 d-flex justify-content-center gap-3">
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
                                            {isLoading
                                                ? "Processing..."
                                                : "Leave"}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Show messages or results */}
                    {error && <p className="text-danger mt-3">{error}</p>}

                    {availableData && (
                        <div
                            className="mt-4 p-3 rounded bg-light"
                            style={{ width: "fit-content" }}
                        >
                            <h5 className="fw-bold text-success">
                                Parking Spot Booked!
                            </h5>
                            <p className="mb-1">
                                Available Spots: {availableData.availableCount}
                            </p>
                            <p>
                                Assigned Slot Index:{" "}
                                {availableData.availableIndex}
                            </p>
                        </div>
                    )}

                    {/* Show amount after leaving */}
                    {amount !== null && (
                        <div
                            className="mt-4 p-3 rounded bg-light border border-success"
                            style={{ width: "fit-content" }}
                        >
                            <h5 className="fw-bold text-success">
                                Amount to Pay: ₹{amount}
                            </h5>
                        </div>
                    )}
                </Container>
            </div>
        </section>
    );
}
