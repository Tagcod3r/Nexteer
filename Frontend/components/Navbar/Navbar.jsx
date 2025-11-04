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
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container>
        <Navbar.Brand href="#" className="brand fw-bold">
          🚗 Map It Right
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="nav-link-custom">
              Services
            </Nav.Link>
            <Nav.Link href="#map" className="nav-link-custom">
              Map
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">
              Contact
            </Nav.Link>
            {isAuthenticated ? (
              <Nav.Link
                onClick={handleLogoutClick}
                className="nav-link-custom logout-btn"
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link-custom login-btn">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
