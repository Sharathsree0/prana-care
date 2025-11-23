import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          
          {/* Column 1: Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="h3 fw-bold text-primary mb-3">WeCare</h5>
            <p className="text-secondary small">
              Professional home nursing and elderly care services delivered with compassion. 
              Treating your family like our own since 2019.
            </p>
            <div className="d-flex gap-3 mt-3">
              {/* Social Icons (using Bootstrap Icons classes if you add them, or text for now) */}
              <a href="#" className="text-light text-decoration-none"><i className="bi bi-facebook"></i> FB</a>
              <a href="#" className="text-light text-decoration-none"><i className="bi bi-instagram"></i> IG</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Links</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none hover-white">About Us</Link></li>
              <li className="mb-2"><Link to="/services" className="text-secondary text-decoration-none hover-white">Services</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none hover-white">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Our Care</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">Elderly Care</li>
              <li className="mb-2">Post-Surgery Nursing</li>
              <li className="mb-2">Physiotherapy</li>
              <li className="mb-2">Mother & Baby Care</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Contact Us</h5>
            <p className="text-secondary mb-2">
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p className="text-secondary mb-2">
              <strong>Email:</strong> help@wecare.com
            </p>
            <p className="text-secondary">
              <strong>Loc:</strong> #123, Green Street, Bangalore, Karnataka
            </p>
          </div>
        </div>
        
        <div className="border-top border-secondary mt-5 pt-3 text-center text-secondary small">
          © {new Date().getFullYear()} WeCare Home Nursing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}