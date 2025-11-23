import { useState } from 'react';

export default function Navbar() {
  // Mobile Menu Logic (Optional, keeps it working on phones)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo scrolls to top */}
        <a className="navbar-brand fw-bold text-primary" href="#home">
           WeCare<span className="text-dark">Nursing</span>
        </a>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item ms-lg-2">
              <a className="btn btn-primary rounded-pill px-4" href="#contact">Book Now</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}