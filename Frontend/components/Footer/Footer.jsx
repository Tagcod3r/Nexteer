import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Map It Right</h4>
          <p>Smart parking solutions for modern cities. Find, book, and park with ease.</p>
        </div>
        
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Services</a></li>
            <li><a href="#map">Map</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h5>Team Members</h5>
          <ul className="team-members">
            <li>Chandan U</li>
            <li>Akshith V</li>
            <li>Cholaraju Adithya</li>
            <li>Arya Pai</li>
          </ul>
        </div>
        
        <div className="footer-section">
         
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Map It Right. Built with ❤️ for Nexteer Hackathon.
        </p>
      </div>
    </footer>
  );
}