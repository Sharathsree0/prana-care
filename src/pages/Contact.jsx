import { useState } from 'react';

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // --- SHORTCUT: PASTE YOUR WEB3FORMS KEY HERE ---
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Get in Touch</h2>
          <p className="text-muted">We are here to help you 24/7</p>
        </div>

        <div className="row g-5">
          {/* Left Side: Contact Info */}
          <div className="col-md-5">
            <div className="p-4 bg-white shadow-sm rounded-3 h-100">
              <h4 className="fw-bold mb-4">Contact Information</h4>
              
              <div className="d-flex mb-4">
                <div className="flex-shrink-0 btn-square bg-primary-subtle text-primary rounded-circle" style={{width: '50px', height: '50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                   <i className="bi bi-geo-alt-fill fs-4">📍</i>
                </div>
                <div className="ms-3">
                  <h6 className="mb-1 fw-bold">Our Location</h6>
                  <p className="text-muted small mb-0">#123, Green Valley, Bangalore, Karnataka</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 bg-primary-subtle text-primary rounded-circle" style={{width: '50px', height: '50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                   <i className="bi bi-telephone-fill fs-4">📞</i>
                </div>
                <div className="ms-3">
                  <h6 className="mb-1 fw-bold">Phone Number</h6>
                  <p className="text-muted small mb-0">+91 98765 43210</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="flex-shrink-0 bg-primary-subtle text-primary rounded-circle" style={{width: '50px', height: '50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                   <i className="bi bi-envelope-fill fs-4">✉️</i>
                </div>
                <div className="ms-3">
                  <h6 className="mb-1 fw-bold">Email Address</h6>
                  <p className="text-muted small mb-0">help@wecare.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="col-md-7">
            <div className="p-4 bg-white shadow-sm rounded-3">
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <input type="text" name="name" className="form-control" required placeholder="John Doe"/>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" required placeholder="+91..."/>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Service Required</label>
                    <select name="service" className="form-select">
                      <option>Home Nursing</option>
                      <option>Elderly Care</option>
                      <option>Physiotherapy</option>
                      <option>Baby Care</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea name="message" className="form-control" rows="4" placeholder="How can we help?"></textarea>
                  </div>
                  
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 py-2">Send Message</button>
                  </div>

                  <div className="col-12 text-center">
                    <span className="text-success fw-bold">{result}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}