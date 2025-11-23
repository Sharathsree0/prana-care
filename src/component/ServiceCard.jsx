export default function ServiceCard({ title, desc, img, link }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 hover-lift">
        <div className="card-img-top overflow-hidden" style={{ height: '200px' }}>
          <img 
            src={img} 
            alt={title} 
            className="w-100 h-100 object-fit-cover" 
          />
        </div>
        <div className="card-body text-center p-4">
          <h5 className="card-title fw-bold text-primary">{title}</h5>
          <p className="card-text text-muted small mb-4">{desc}</p>
          
          {/* CHANGED Link to 'a' tag for scrolling */}
          <a href={link} className="btn btn-outline-primary rounded-pill btn-sm px-4">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}