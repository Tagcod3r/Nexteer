import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoImage from "./photo.png"; // Import the image

export default function AppNavbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand d-flex align-items-center">
          <img 
            src={logoImage}
            alt="Map It Right Logo"
            style={{ 
              height: "80px", 
              width: "auto", 
              objectFit: "contain" 
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              href="#home" 
              className="nav-link-custom"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#features" 
              className="nav-link-custom"
              onClick={(e) => handleNavClick(e, '#features')}
            >
              Services
            </Nav.Link>
            <Nav.Link 
              href="#map" 
              className="nav-link-custom"
              onClick={(e) => handleNavClick(e, '#map')}
            >
              Map
            </Nav.Link>
            <Nav.Link 
              href="#contact" 
              className="nav-link-custom"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Contact
            </Nav.Link>
            {isAuthenticated ? (
              <Nav.Link
                onClick={handleLogoutClick}
                className="nav-link-custom logout-btn"
                style={{ cursor: "pointer" }}
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