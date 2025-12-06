/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "./Contact.css";
import dbs from "../firebase";

export default function Contact() {
  const [result, setResult] = useState("");
  // Separate states for Call and Message numbers
  const [callNumber, setCallNumber] = useState("919092630929");
  const [messageNumber, setMessageNumber] = useState("919092630929");

  const fetchContactInfo = async () => {
    const res = await dbs.readDocument("admin_settings", "phone");
    if (res) {
      if (res.phone) setCallNumber(res.phone);
      // Prioritize whatsapp field, otherwise fallback to phone
      if (res.whatsapp) setMessageNumber(res.whatsapp);
      else if (res.phone) setMessageNumber(res.phone);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    const id = Date.now().toString();

    const newLead = {
      id,
      name,
      phone,
      service,
      message,
      status: "New",
      date: new Date().toISOString().split("T")[0],
    };

    await dbs.addDocument("admin_leads", id, newLead);

    // Use messageNumber for WhatsApp URL
    const cleanWhatsApp = messageNumber.replace(/[^0-9]/g, "");

    const whatsappUrl =
      `https://wa.me/${cleanWhatsApp}?text=` +
      `*New Inquiry from Website*%0a` +
      `Name: ${name}%0a` +
      `Phone: ${phone}%0a` +
      `Service: ${service}%0a` +
      `Message: ${message}`;

    window.open(whatsappUrl, "_blank");

    setResult("Saved! Opening WhatsApp... ✅");
    event.target.reset();
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">

        <div className="contact-header">
          <h2>Get in Touch</h2>
          <p>We are here to help you 24/7</p>
        </div>

        <div className="contact-grid">
          
          <div className="contact-info-card">
            <h3>Contact Information</h3>

            <div className="contact-info-item">
              <div className="contact-icon"><FaMapMarkerAlt size={20} /></div>
              <div>
                <h4>Our Location</h4>
                <p>#123, Green Valley, Bangalore</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon"><FaPhoneAlt size={20} /></div>
              <div>
                <h4>Call Us</h4>
                <p>
                  <a href={`tel:${callNumber}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {callNumber}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon" style={{ background: "#25d366", color: "white" }}>
                <FaWhatsapp size={22} />
              </div>
              <div>
                <h4>WhatsApp / Message</h4>
                <p>{messageNumber}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon"><FaEnvelope size={20} /></div>
              <div>
                <h4>Email Address</h4>
                <p>help@pranacare.com</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={onSubmit} className="contact-form">

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="+91..." required />
                </div>
              </div>

              <div className="form-group">
                <label>Service Required</label>
                <select name="service">
                  <option>Home Nursing</option>
                  <option>Elderly Care</option>
                  <option>Physiotherapy</option>
                  <option>Baby Care</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows="4" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="contact-submit">Send Message</button>

              <div className="form-result">
                {result && <span>{result}</span>}
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}