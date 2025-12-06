/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Hero.css";
import dbs from "../firebase";

export default function Hero() {
  const [content, setContent] = useState({
    tagline: "",
    title: "",
    highlight: "",
    desc: ""
  });

  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for the call number
  const [callNumber, setCallNumber] = useState("+91 9092630929");

  const fetchHeroText = async () => {
    const data = await dbs.readDocument("site_content", "home_hero");

    if (data) {
      setContent(data);
    } else {
      const defaultHero = {
        tagline: "Home Nursing • Elderly Care • Physiotherapy",
        title: "Compassionate Care,",
        highlight: "Right at Your Home",
        desc: "Professional nursing, elderly care, and physiotherapy services delivered with love and expertise. We treat your family like our own."
      };
      await dbs.addDocument("site_content", "home_hero", defaultHero);
      setContent(defaultHero);
    }
  };

  const fetchHeroGallery = async () => {
    const data = await dbs.readCollection("gallery_hero");
    const urls = data.map((item) => item.url);

    setGallery(urls.length > 0 ? urls : ["https://dummyimage.com/600x400/343a40/6c757d"]);
  };

  // Fetch the phone number from Admin Settings
  const fetchPhone = async () => {
    const data = await dbs.readDocument("admin_settings", "phone");
    if (data?.phone) {
      setCallNumber(data.phone);
    }
  };

  useEffect(() => {
    fetchHeroText();
    fetchHeroGallery();
    fetchPhone();
  }, []);

  useEffect(() => {
    if (gallery.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gallery]);

  // Handle Call Logic
  const handleCall = (e) => {
    e.preventDefault();
    if (window.confirm(`Do you want to call ${callNumber}?`)) {
      window.location.href = `tel:${callNumber}`;
    }
  };

  return (
    <header id="home" className="hero">
      <div className="hero-container">

        <div className="hero-left">
          <p className="hero-tagline">{content.tagline}</p>

          <h1 className="hero-title">
            {content.title} <br />
            <span>{content.highlight}</span>
          </h1>

          <p className="hero-text">{content.desc}</p>

          <div className="hero-actions">
            {/* CHANGED: Calls the number instead of scrolling */}
            <a href="#" onClick={handleCall} className="hero-btn hero-btn-primary">
              Call Us
            </a>
            <a href="#services" className="hero-btn hero-btn-outline">Our Services</a>
          </div>

          <div className="hero-meta">
            <div>
              <span className="hero-meta-number">24/7</span>
              <span className="hero-meta-label">Nursing Support</span>
            </div>
            <div>
              <span className="hero-meta-number">500+</span>
              <span className="hero-meta-label">Families Served</span>
            </div>
            <div>
              <span className="hero-meta-number">4.9★</span>
              <span className="hero-meta-label">Care Rating</span>
            </div>
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