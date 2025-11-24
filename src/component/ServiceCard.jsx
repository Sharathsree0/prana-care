import "./ServiceCard.css";

export default function ServiceCard({ title, desc, img, link }) {
  return (
    <div className="service-card">
      <div className="service-img">
        <img src={img} alt={title} />
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        <p>{desc}</p>

        <a href={link} className="service-btn">
          Learn More
        </a>
      </div>
    </div>
  );
}
