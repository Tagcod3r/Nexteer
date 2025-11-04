import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import ParkingRouteToDestination from "../map/Map";

export default function Home() {
    const [destination, setDestination] = useState("mantri");
    const [showMap, setShowMap] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMap(true);
    };

    return (
        <section className="home-section">
            <div className="overlay">
                <Container className="text-center d-flex flex-column justify-content-center align-items-center h-100">
                    <h1 className="title fw-bold mb-4">
                        Find Parking Smarter with{" "}
                        <span className="brand">Nexteer</span>
                    </h1>

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

                    {showMap && (
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
                    )}
                </Container>
            </div>
        </section>
    );
}
