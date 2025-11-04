import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="footer text-center text-white py-3"
    >
      <p className="mb-0">
        © {new Date().getFullYear()} Map It Right. Built with ❤️ for Nexteer Hackathon.
      </p>
    </footer>
  );
}
