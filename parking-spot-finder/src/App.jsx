import React from "react";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MapView from "./components/map/MapView";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <AppNavbar />
      <Hero />
      <Features />
      <section id="map" className="py-5 bg-light">
        <MapView />
      </section>
      <Footer />
    </>
  );
}
