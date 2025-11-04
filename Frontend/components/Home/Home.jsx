import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import ParkingRouteToDestination from "../map/Map";
import "./Home.css";

export default function Home() {
  const [destination, setDestination] = useState("mantri");
  const [showMap, setShowMap] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Trigger map visibility
    setShowMap(true);

    // Step 2: Delay scroll to let fade-in animation start
    setTimeout(() => {
      const mapSection = document.getElementById("map-section");
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setMapVisible(true);
      }
    }, 400);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="home-section">
        <div className="overlay">
          <Container className="text-center d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="title fw-bold mb-4">
              Find Parking Smarter with{" "}
              <span className="brand">Nexteer</span>
            </h1>

            <Form onSubmit={handleSubmit} className="search-box">
              <Form.Group className="mb-3 search-group">
                <Form.Label className="fw-semibold text-muted">
                  Select Destination
                </Form.Label>
                <Form.Select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="search-select"
                >
                  <option value="mantri">Mantri Mall</option>
                  <option value="orion">Orion Mall</option>
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
          </Container>
        </div>
      </section>

      {/* Smooth Appearing Map Section */}
      {showMap && (
        <section
          id="map-section"
          className={`map-display-section ${mapVisible ? "fade-in" : ""}`}
        >
          <Container>
            <div className="map-preview">
              <ParkingRouteToDestination selectedDestination={destination} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
