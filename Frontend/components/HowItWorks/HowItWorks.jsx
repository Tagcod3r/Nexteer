import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./HowItWorks.css";

const steps = [
  {
    title: "Find Parking Near You",
    description:
      "Enter your destination, and Map It Right instantly shows available parking spots within your preferred radius. No more endless searching or circling around busy streets.",
    animation: "https://lottie.host/97c27750-fd9e-478f-b5ab-645874020289/fmS4KToPFA.lottie",
  },
  {
    title: "Book Instantly, Drive Stress-Free",
    description:
      "Select your convenient parking spot, confirm your booking, and enjoy a 30-minute hold to reach without losing your slot. Parking has never been this effortless.",
    animation: "https://lottie.host/b080db7c-c621-431c-93c4-2655c15c757a/JTvNdLrjdY.lottie",
  },
  {
    title: "Arrive & Park Seamlessly",
    description:
      "Navigate with real-time directions, park in your reserved slot, and move ahead with peace of mind. Map It Right ensures every journey ends stress-free.",
    animation: "https://lottie.host/fbed98bd-dff3-4ac2-a484-aa7698fc09b5/X2ucoMiv2m.lottie",
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
            {/* Text Section */}
            <Col md={6} className="how-text-col">
              <div className="how-text">
                <h3>{step.title}</h3>
                <div className="red-underline"></div>
                <p>{step.description}</p>
              </div>
            </Col>

            {/* Lottie Animation */}
            <Col md={6} className="text-center how-img-col">
              <div className="lottie-box">
                <DotLottieReact
                  src={step.animation}
                  loop
                  autoplay
                />
              </div>
            </Col>
          </Row>
        ))}
      </Container>

      <div className="section-line"></div>
    </section>
  );
}
