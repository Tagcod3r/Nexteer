import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks"; // ✅ New import
import MapView from "../components/map/MapView";
import Footer from "../components/Footer/Footer";
import Login from "../components/Authorization_Authentication/Login";
import Signup from "../components/Authorization_Authentication/Signup";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  return (
    <>
      <AppNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
              {/* ✅ New section added below Our Services */}
              <HowItWorks />
              <section id="map" className="py-5 bg-light">
                <MapView />
              </section>
            </>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}
