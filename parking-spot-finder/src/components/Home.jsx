import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
        color: "white",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <Container className="text-center py-5">
        <h1 className="fw-bold display-4 mb-3">Find & Reserve Parking Instantly</h1>
        <p className="lead text-light mb-4">
          Real-time availability, smart navigation, and easy bookings — all in one app.
        </p>
        <Button
          variant="info"
          size="lg"
          className="fw-bold px-4"
          onClick={() => navigate("/map")}
        >
          🚗 Start Now
        </Button>
      </Container>

      <Container className="py-5">
        <Row className="g-4">
          {[
            { title: "Live Availability", text: "See real-time parking spots near you." },
            { title: "Smart Navigation", text: "Get guided routes to your reserved spots." },
            { title: "Pre-Booking", text: "Reserve spots in advance with one click." },
            { title: "Digital Payments", text: "Pay securely via UPI or cards." },
          ].map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                }}
                className="h-100 text-center p-3"
              >
                <Card.Body>
                  <Card.Title className="fw-bold text-info">{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
