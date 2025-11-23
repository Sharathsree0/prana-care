export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          
          <div className="col-lg-4 col-md-6">
            <h5 className="h3 fw-bold text-primary mb-3">WeCare</h5>
            <p className="text-secondary small">
              Professional home nursing and elderly care services delivered with compassion.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-light text-decoration-none">FB</a>
              <a href="#" className="text-light text-decoration-none">IG</a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Links</h5>
            <ul className="list-unstyled text-secondary">
              {/* CHANGED Links to 'a' tags */}
              <li className="mb-2"><a href="#home" className="text-secondary text-decoration-none hover-white">Home</a></li>
              <li className="mb-2"><a href="#about" className="text-secondary text-decoration-none hover-white">About Us</a></li>
              <li className="mb-2"><a href="#services" className="text-secondary text-decoration-none hover-white">Services</a></li>
              <li className="mb-2"><a href="#contact" className="text-secondary text-decoration-none hover-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Our Care</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">Elderly Care</li>
              <li className="mb-2">Post-Surgery Nursing</li>
              <li className="mb-2">Physiotherapy</li>
              <li className="mb-2">Mother & Baby Care</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Contact Us</h5>
            <p className="text-secondary mb-2"><strong>Phone:</strong> +91 98765 43210</p>
            <p className="text-secondary mb-2"><strong>Email:</strong> help@wecare.com</p>
          </div>
        </div>
        
        <div className="border-top border-secondary mt-5 pt-3 text-center text-secondary small">
          © {new Date().getFullYear()} WeCare Home Nursing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}