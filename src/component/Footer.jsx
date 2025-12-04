import "./Footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="footer">

      <div className="footer-container">

        <div className="footer-grid">

          <div className="footer-col">
            <h3 className="footer-logo">PranaHome<span>Care</span></h3>

            <p className="footer-desc">
              Professional home nursing and elderly care services delivered with compassion.
            </p>

            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Our Care</h4>
            <ul className="footer-list">
              <li>Elderly Care</li>
              <li>Post-Surgery Nursing</li>
              <li>Physiotherapy</li>
              <li>Mother & Baby Care</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>

            <p className="footer-text"><strong>Phone:</strong> +91 9092630929</p>
            <p className="footer-text"><strong>Email:</strong> help@PranaCare.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} PranaCare. All rights reserved.
        </div>

      </div>
    </footer>
  );
}