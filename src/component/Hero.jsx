import { useState, useEffect } from "react";
import "./Hero.css";

export default function Hero() {
  const loadGallery = () => {
    const stored = localStorage.getItem("gallery_hero");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.length > 0 ? parsed : ["https://dummyimage.com/600x400/343a40/6c757d"];
  };

  const [gallery, setGallery] = useState(loadGallery);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setGallery(loadGallery());
      setCurrentIndex(0); 
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [gallery.length]);

  return (
    <header id="home" className="hero">
      <div className="hero-container">
        
        <div className="hero-left">
          <p className="hero-tagline">Home Nursing • Elderly Care • Physiotherapy</p>
          <h1 className="hero-title">Compassionate Care, <br /><span>Right at Your Home</span></h1>
          <p className="hero-text">Professional nursing, elderly care, and physiotherapy services delivered with love and expertise.</p>
          
          <div className="hero-actions">
            <a href="#contact" className="hero-btn hero-btn-primary">Book Now</a>
            <a href="#services" className="hero-btn hero-btn-outline">Our Services</a>
          </div>

          <div className="hero-meta">
            <div><span className="hero-meta-number">24/7</span><span className="hero-meta-label">Nursing Support</span></div>
            <div><span className="hero-meta-number">500+</span><span className="hero-meta-label">Families Served</span></div>
            <div><span className="hero-meta-number">4.9★</span><span className="hero-meta-label">Care Rating</span></div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              key={currentIndex}
              src={gallery[currentIndex]}
              alt="Nursing Care Gallery"
              className="hero-image fade-in" 
              style={{ 
                width: "100%", 
                height: "400px", 
                objectFit: "cover",
                transition: "opacity 0.5s ease-in-out" 
              }}
            />
            <div className="hero-floating-card">
              <p className="hero-floating-title">Trusted Home Nurses</p>
              <p className="hero-floating-sub">Verified & experienced staff</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}