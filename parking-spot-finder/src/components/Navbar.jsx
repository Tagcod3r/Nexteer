import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand href="#" className="fw-bold text-danger">
          🚗 Map It Right
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-danger fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="text-danger fw-semibold">
              Features
            </Nav.Link>
            <Nav.Link href="#map" className="text-danger fw-semibold">
              Map
            </Nav.Link>
            <Nav.Link href="#contact" className="text-danger fw-semibold">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
