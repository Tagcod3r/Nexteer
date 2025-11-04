import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HowItWorks.css";

const steps = [
  {
    title: "Find Parking Near You",
    description:
      "Enter your destination, and Map It Right instantly shows available parking spots within your preferred radius. No more endless searching or circling around busy streets.",
    img: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    btnText: "Find Spots →",
  },
  {
    title: "Book Instantly, Drive Stress-Free",
    description:
      "Select your convenient parking spot, confirm your booking, and enjoy a 30-minute hold to reach without losing your slot. Parking has never been this effortless.",
    img: "https://cdn-icons-png.flaticon.com/512/942/942751.png",
    btnText: "Book Now →",
  },
  {
    title: "Arrive & Park Seamlessly",
    description:
      "Navigate with real-time directions, park in your reserved slot, and move ahead with peace of mind. Map It Right ensures every journey ends stress-free.",
    img: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
    btnText: "Navigate →",
  },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="how-section">
      <div className="section-line"></div>

      <Container>

        {steps.map((step, index) => (
          <Row
            key={index}
            className={`align-items-center how-row ${
              index % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <Col md={6} className="how-text-col">
              <div className="how-text">
                <h3>{step.title}</h3>
                 <div className="red-underline"></div>
                <p>{step.description}</p>
                <Button
                  variant="danger"
                  className="mt-3 px-4 py-2 fw-semibold custom-btn"
                >
                  {step.btnText}
                </Button>
              </div>
            </Col>

            {/* Image */}
            <Col md={6} className="text-center how-img-col">
              <img src={step.img} alt={step.title} className="how-img" />
            </Col>
          </Row>
        ))}
      </Container>

      <div className="section-line"></div>
    </section>
  );
}
