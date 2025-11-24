import { useState, useEffect } from 'react';

export default function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="floating-container">
      {/* WhatsApp Button with Official Logo Image */}
      <a 
        href="https://wa.me/919876543210?text=Hello%20WeCare,%20I%20need%20more%20info."
        className="btn-float whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: '0', overflow: 'hidden' }} // shortcut style tweak
      >
        {/* THE SHORTCUT: Using the official SVG image directly */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          style={{ width: '35px', height: '35px' }} 
        />
      </a>

      {/* Back to Top Button (Keep this simple) */}
      {showTopBtn && (
        <button onClick={scrollToTop} className="btn-float top-btn">
          ↑
        </button>
      )}
    </div>
  );
}