import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="text-center text-white py-3"
      style={{ background: "#b31217" }}
    >
      <p className="mb-0">
        © {new Date().getFullYear()} Map It Right. Built with ❤️ for Nexteer Hackathon.
      </p>
    </footer>
  );
}
