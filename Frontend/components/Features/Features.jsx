import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./features.css";

const features = [
  {
    title: "Live Parking Map",
    desc: "View real-time parking availability near your destination.",
    icon: "📍",
  },
  {
    title: "No-Parking Alerts",
    desc: "Get warned before entering restricted zones.",
    icon: "🚫",
  },
  {
    title: "Book & Navigate",
    desc: "Reserve your spot and get directions instantly.",
    icon: "🅿️",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-5 bg-light text-center">
      <Container>
        <h2 className="fw-bold text-danger mb-5">Key Features</h2>
        <Row>
          {features.map((f, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="feature-icon">{f.icon}</div>
                  <Card.Title className="mt-3 fw-bold text-danger">
                    {f.title}
                  </Card.Title>
                  <Card.Text className="text-muted">{f.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
