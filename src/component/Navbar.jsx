import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        
        {/* Logo */}
        <a href="#home" className="nav-logo">
          PranaCare<span>Nursing</span>
        </a>

        {/* Mobile toggle */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Links */}
        <ul className={`nav-links ${isOpen ? "show" : ""}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>

          <li>
            <a href="#contact" className="nav-btn">Book Now</a>
          </li>
        </ul>

      </div>
    </nav>
  );
}
