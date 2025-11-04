import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (source.trim() === "" || destination.trim() === "") {
      alert("Please enter both source and destination areas");
      return;
    }

    console.log("Source:", source);
    console.log("Destination:", destination);
    // Later: redirect to login or map page
  };

  return (
    <section className="home-section">
      <div className="overlay">
        <Container className="text-center d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="title fw-bold mb-4">
            Find Parking Smarter with <span className="brand">Nexteer</span>
          </h1>

          <Form onSubmit={handleSearch} className="search-box w-100">
            <Row className="justify-content-center">
              <Col xs={10} sm={8} md={6} lg={5}>
                {/* Source Input */}
                <div className="input-group shadow mb-3">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-geo-alt text-danger"></i>
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Source Address"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="form-control-lg"
                  />
                </div>

                {/* Destination Input */}
                <div className="input-group shadow">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-geo text-danger"></i>
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Destination / Area"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="form-control-lg"
                  />
                </div>
              </Col>
            </Row>

            <Button
              type="submit"
              className="find-btn fw-bold mt-4 px-5 py-3"
              variant="danger"
            >
              Find Parking
            </Button>
          </Form>
        </Container>
      </div>
    </section>
  );
}
