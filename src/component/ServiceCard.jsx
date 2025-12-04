import { useState, useEffect } from "react";
import "./ServiceCard.css";

export default function ServiceCard({ id, title, price, desc, img, link }) {
  
  const loadImages = () => {
    const stored = localStorage.getItem(`gallery_service_${id}`);
    return stored ? JSON.parse(stored) : [img];
  };

  const [gallery, setGallery] = useState(loadImages);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleStorage = () => {
      setGallery(loadImages());
      setIndex(0);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [id]);

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
        
        {price && <h4 style={{color: '#059669', marginBottom: '8px', fontSize: '15px'}}>{price}</h4>}
        
        <p>{desc}</p>
        <a href={link} className="service-btn">Learn More</a>
      </div>
    </div>
  );
}