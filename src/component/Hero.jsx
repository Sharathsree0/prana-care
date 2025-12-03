import { useState, useEffect } from "react";
import "./Hero.css";

export default function Hero() {
  // 1. Helper function to load data safely
  const loadGallery = () => {
    const stored = localStorage.getItem("gallery_hero");
    const parsed = stored ? JSON.parse(stored) : [];
    // Return saved images OR default placeholder if empty
    return parsed.length > 0 ? parsed : ["https://dummyimage.com/600x400/343a40/6c757d"];
  };

  const [gallery, setGallery] = useState(loadGallery);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. AUTO-UPDATE LISTENER (The Magic Part ✨)
  useEffect(() => {
    // This function runs whenever LocalStorage changes in another tab
    const handleStorageChange = () => {
      setGallery(loadGallery());
      setCurrentIndex(0); // Reset slideshow to start
    };

    // Listen for the 'storage' event
    window.addEventListener("storage", handleStorageChange);

    // Cleanup when component unmounts
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 3. Slideshow Timer
  useEffect(() => {
    if (gallery.length <= 1) return; // Don't slide if only 1 image

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [gallery.length]);

  return (
    <header id="home" className="hero">
      <div className="hero-container">
        
        {/* LEFT SIDE TEXT */}
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

        {/* RIGHT SIDE - DYNAMIC SLIDESHOW */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              key={currentIndex} // Key change triggers animation
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