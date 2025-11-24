import "./Hero.css";

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="hero-container">
        {/* LEFT SIDE TEXT */}
        <div className="hero-left">
          <p className="hero-tagline">
            Home Nursing • Elderly Care • Physiotherapy
          </p>

          <h1 className="hero-title">
            Compassionate Care, <br />
            <span>Right at Your Home</span>
          </h1>

          <p className="hero-text">
            Professional nursing, elderly care, and physiotherapy services
            delivered with love and expertise. We treat your family like our own.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="hero-btn hero-btn-primary">
              Get Started
            </a>
            <a href="#services" className="hero-btn hero-btn-outline">
              Our Services
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <span className="hero-meta-number">24/7</span>
              <span className="hero-meta-label">Nursing Support</span>
            </div>
            <div>
              <span className="hero-meta-number">500+</span>
              <span className="hero-meta-label">Families Served</span>
            </div>
            <div>
              <span className="hero-meta-number">4.9★</span>
              <span className="hero-meta-label">Care Rating</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              src="https://dummyimage.com/600x400/343a40/6c757d"
              alt="Nursing Care"
              className="hero-image"
            />

            <div className="hero-floating-card">
              <p className="hero-floating-title">Trusted Home Nurses</p>
              <p className="hero-floating-sub">Verified & experienced staff</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
