/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import dbs from "../firebase";

export default function Footer() {
  const [footer, setFooter] = useState({
    logoPrefix: "PranaHome",
    logoSuffix: "Nursing",
    desc: "Professional home nursing and elderly care services delivered with compassion.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    phone: "+91 9092630929",
    email: "help@pranacare.com",
    copyrightText: "PranaCare",
    links: [
      { label: "Home", link: "#home" },
      { label: "About Us", link: "#about" },
      { label: "Services", link: "#services" },
      { label: "Contact", link: "#contact" }
    ],
    services: [
      "Elderly Care",
      "Post-Surgery Nursing",
      "Physiotherapy",
      "Mother & Baby Care"
    ]
  });

  const loadFooter = async () => {
    const data = await dbs.readDocument("site_settings", "footer");
    if (data) setFooter((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    loadFooter();
  }, []);

  return (
    <footer id="footer" className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          <div className="footer-col">
            {/* UPDATED LOGO STRUCTURE */}
            <h3 className="footer-logo">
              {footer.logoPrefix || "PranaHome"}
              <span>{footer.logoSuffix || "Care"}</span>
            </h3>

            <p className="footer-desc">{footer.desc}</p>

            <div className="footer-social">
              <a href={footer.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>

              <a href={footer.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Links</h4>
            <ul className="footer-links">
              {footer.links && footer.links.map((item, idx) => (
                <li key={idx}><a href={item.link}>{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Our Care</h4>
            <ul className="footer-list">
              {footer.services && footer.services.map((srv, idx) => (
                <li key={idx}>{srv}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>

            <p className="footer-text">
              <strong>Phone:</strong> {footer.phone}
            </p>

            <p className="footer-text">
              <strong>Email:</strong> {footer.email}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {footer.copyrightText || "PranaCare"}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}