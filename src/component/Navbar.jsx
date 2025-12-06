import { useState } from "react";
import "./Navbar.css";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ darkMode, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        
        {/* 1. LOGO (Left) */}
        <a href="#home" className="nav-logo">
          PranaHome<span>Nursing</span>
        </a>

        {/* 2. LINKS (Middle - Hidden on Mobile) */}
        {/* I moved this UP so it sits in the middle on Desktop */}
        <ul className={`nav-links ${isOpen ? "show" : ""}`}>
          <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About Us</a></li>
          <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
          <li>
            <a href="#contact" className="nav-btn" onClick={() => setIsOpen(false)}>Book Now</a>
          </li>
        </ul>

        {/* 3. ICONS GROUP (Right - Visible on Mobile) */}
        {/* We group Theme + Hamburger here so they stay together */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          
          {/* Theme Button */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            style={{ 
              background: "transparent", 
              border: "1px solid #ccc", 
              padding: "8px", 
              borderRadius: "50%", 
              cursor: "pointer", 
              display: "flex"
            }}
          >
            {darkMode ? <FaSun size={18} color="#fbbf24" /> : <FaMoon size={18} color="#4b5563" />}
          </button>

          {/* Hamburger (Mobile Only) */}
          <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

      </div>
    </nav>
  );
}