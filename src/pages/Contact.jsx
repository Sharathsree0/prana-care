import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    // --- 1. SAVE TO ADMIN DASHBOARD (LocalStorage) ---
    const newLead = {
      id: Date.now(),
      name: name,
      phone: phone,
      service: service,
      message: message, // Saving the message too
      status: "New",
      date: new Date().toISOString().split('T')[0]
    };

    // Get existing leads, add new one, save back
    const existingLeads = JSON.parse(localStorage.getItem("adminLeads") || "[]");
    localStorage.setItem("adminLeads", JSON.stringify([newLead, ...existingLeads]));
    
    // Notify Admin Dashboard to update instantly
    window.dispatchEvent(new Event("storage"));

    // --- 2. SEND TO WHATSAPP ---
    // REPLACE with your real phone number (Format: CountryCode + Number, e.g., 919092630929)
    const myPhoneNumber = "919092630929"; 
    
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=` +
      `*New Inquiry from Website*%0a` +
      `Name: ${name}%0a` +
      `Phone: ${phone}%0a` +
      `Service: ${service}%0a` +
      `Message: ${message}`;

    // Open WhatsApp in a new tab
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
          {/* LEFT: INFO */}
          <div className="contact-info-card">
            <h3>Contact Information</h3>
            <div className="contact-info-item">
              <div className="contact-icon"><span>📍</span></div>
              <div><h4>Our Location</h4><p>#123, Green Valley, Bangalore</p></div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><span>📞</span></div>
              <div><h4>Phone Number</h4><p>+91 90926 30929</p></div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><span>✉️</span></div>
              <div><h4>Email Address</h4><p>help@pranacare.com</p></div>
            </div>
          </div>

          {/* RIGHT: FORM */}
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