import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./features.css";

const services = [
  {
    title: "Find Your Sweet Spot",
    desc: "Discover the nearest and most suitable parking zones based on your destination and time preferences.",
    icon: "📍",
  },
  {
    title: "Book Instantly",
    desc: "Reserve your parking spot ahead of time and skip the waiting or uncertainty.",
    icon: "🅿️",
  },
  {
    title: "Hassle-Free Parking",
    desc: "Seamless access, smart updates, and real-time management for a smooth parking experience.",
    icon: "🚗",
  },
];

export default function Features() {
  return (
    <section id="features" className="services-section">
      <Container>
        <div className="section-header">
          <h2>Our Services</h2>
          <div className="underline"></div>
        </div>

        <Row className="g-4 justify-content-center">
          {services.map((service, idx) => (
            <Col key={idx} lg={4} md={6} className="d-flex">
              <Card className="service-card text-center">
                <div className="icon-box">
                  {service.icon}
                </div>
                <Card.Body className="p-0">
                  <Card.Title as="h5" className="fw-semibold">
                    {service.title}
                  </Card.Title>
                  <Card.Text>
                    {service.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}