import { useState, useEffect } from "react";
import "./FloatingButtons.css";

export default function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 350);
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-wrapper">

      <a
        href="https://wa.me/9092630929?text=Hello%20WeCare,%20I%20need%20more%20info."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>

      {showTopBtn && (
        <button className="floating-btn top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}
