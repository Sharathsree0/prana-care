import { useState, useEffect } from "react";
import "./FloatingButtons.css";
import dbs from "../firebase";

export default function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("9092630929"); // fallback

  // Load WhatsApp number from Firestore
  const loadContact = async () => {
    const data = await dbs.readDocument("admin_settings", "phone");
    if (data?.phone) {
      // Clean number (remove spaces, +, anything non-digit)
      const cleaned = data.phone.replace(/[^0-9]/g, "");
      setWhatsappNumber(cleaned);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 350);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-wrapper">

      {/* Dynamic WhatsApp Link */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hello%20WeCare,%20I%20need%20more%20info.`}
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
