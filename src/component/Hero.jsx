import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    // "d-flex align-items-center" centers everything vertically
    // "min-vh-100" makes it take the full height of the screen (minus navbar)
    <header className="bg-light py-5">
      <div className="container px-5">
        <div className="row gx-5 align-items-center justify-content-center">
          
          {/* Left Side: Text */}
          <div className="col-lg-8 col-xl-7 col-xxl-6">
            <div className="my-5 text-center text-xl-start">
              <h1 className="display-5 fw-bolder text-dark mb-2">
                Compassionate Care, <br />
                <span className="text-primary">Right at Your Home</span>
              </h1>
              <p className="lead fw-normal text-muted mb-4">
                Professional nursing, elderly care, and physiotherapy services delivered with love and expertise. We treat your family like our own.
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                <Link className="btn btn-primary btn-lg px-4 me-sm-3" to="/contact">
                  Get Started
                </Link>
                <Link className="btn btn-outline-dark btn-lg px-4" to="/services">
                  Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
            <img 
              className="img-fluid rounded-3 my-5" 
              // Placeholder image (Replace this URL with your local image later)
              src="https://dummyimage.com/600x400/343a40/6c757d" 
              alt="Nursing Care" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}