import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation(); // This hooks gets the current URL path

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path ? "nav-link active fw-bold text-primary" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo Section */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
           WeCare<span className="text-dark">Nursing</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={isActive("/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/about")} to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/services")} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/contact")} to="/contact">Contact</Link>
            </li>
          </ul>
          
          {/* Call to Action Button */}
          <div className="ms-lg-3 mt-2 mt-lg-0">
             <Link to="/contact" className="btn btn-primary rounded-pill px-4">
               Book Now
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}