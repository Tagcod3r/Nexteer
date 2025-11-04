import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";

export default function Home() {

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="hero-section d-flex align-items-center justify-content-center text-center text-white"
      >
        <Container>
          <h1 className="fw-bold display-4 mb-3">Find Parking Effortlessly</h1>
          <p className="lead mb-4">
            Discover real-time parking spots, avoid no-parking zones, and save time.
          </p>
          <Button
            variant="light"
            size="lg"
            href="#map"
            className="fw-bold text-danger px-4 py-2"
          >
            Explore Map
          </Button>
        </Container>
      </section>
    </>
  );
}
