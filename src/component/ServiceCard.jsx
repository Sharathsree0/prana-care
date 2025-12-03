import { useState, useEffect } from "react";
import "./ServiceCard.css";

export default function ServiceCard({ id, title, desc, img, link }) {
  
  // 1. Helper to load images for THIS specific service ID
  const loadImages = () => {
    const stored = localStorage.getItem(`gallery_service_${id}`);
    return stored ? JSON.parse(stored) : [img]; // Fallback to default image
  };

  const [gallery, setGallery] = useState(loadImages);
  const [index, setIndex] = useState(0);

  // 2. LIVE LISTENER (Crucial for updates!)
  useEffect(() => {
    const handleStorage = () => {
      setGallery(loadImages());
      setIndex(0);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [id]); // Re-run if ID changes

  // 3. Slideshow Timer
  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % gallery.length), 3000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  return (
    <div className="service-card">
      <div className="service-img">
        <img 
          key={index}
          src={gallery[index]} 
          alt={title}
          style={{ transition: "opacity 0.5s", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <a href={link} className="service-btn">Learn More</a>
      </div>
    </div>
  );
}