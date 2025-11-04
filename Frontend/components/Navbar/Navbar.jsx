import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function AppNavbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

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
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogoutClick} className="text-danger fw-semibold">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-danger fw-semibold">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
