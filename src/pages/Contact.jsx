import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // TODO: add your Web3Forms key
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form submitted successfully ✅");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message || "Something went wrong.");
    }
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
              <div className="contact-icon">
                <span>📍</span>
              </div>
              <div>
                <h4>Our Location</h4>
                <p>#123, Green Valley, Bangalore, Karnataka</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <span>📞</span>
              </div>
              <div>
                <h4>Phone Number</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <span>✉️</span>
              </div>
              <div>
                <h4>Email Address</h4>
                <p>help@wecare.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="contact-form-card">
            <form onSubmit={onSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91..."
                    required
                  />
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
                <textarea
                  name="message"
                  rows="4"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              <button type="submit" className="contact-submit">
                Send Message
              </button>

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
