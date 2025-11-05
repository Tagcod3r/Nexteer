import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './ParkingAnimation.css';

const ParkingAnimation = () => {
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "CCTV Footage Capture",
      description: "30-second footage collected from parking cameras every 15 minutes for real-time analysis."
    },
    {
      title: "AI Processing", 
      description: "Computer vision algorithms detect available parking spots with high accuracy."
    },
    {
      title: "Live Database Update",
      description: "Spot availability and occupancy status updated instantly in our database."
    },
    {
      title: "Real-time Allocation", 
      description: "Users receive instant spot allocation based on latest AI-processed data."
    }
  ];

  return (
    <section id="animation" className="parking-animation-section">
      <div className="container">
        <div className="section-header">
          <h2>AI-Powered Parking Detection</h2>
          <div className="underline"></div>
        </div>
        
        <div className="animation-content">
          <div className="ai-process-flow">
            <div className="process-steps">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="process-step"
                  ref={el => stepRefs.current[index] = el}
                >
                  <div className="step-marker"></div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="animation-container">
            <DotLottieReact
              src="https://lottie.host/daade82c-b164-4da9-8d2e-affd670ba75a/JSB2YRH6ed.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParkingAnimation;