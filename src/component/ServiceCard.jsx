import { useState, useEffect } from "react";
import "./ServiceCard.css";
import dbs from "../firebase";

export default function ServiceCard({ id, title, price, desc, img, link }) {
  const [gallery, setGallery] = useState([img]);
  const [index, setIndex] = useState(0);

  // Fetch gallery docs from Firestore collection: gallery_service_{id}
  const fetchGallery = async () => {
    try {
      const colName = `gallery_service_${id}`;
      const data = await dbs.readCollection(colName);
      const urls = (data && data.length > 0) ? data.map((d) => d.url).filter(Boolean) : [];
      setGallery(urls.length > 0 ? urls : [img]);
      setIndex(0);
    } catch (err) {
      // fallback to default image on error
      setGallery([img]);
      setIndex(0);
      // console.error("Failed to load service gallery:", err);
    }
  };

  // initial load + reload when id changes
  useEffect(() => {
    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // lightweight polling so admin changes in Firestore appear without full reload.
  // Poll interval is 10s — small enough to be responsive, not aggressive.
  useEffect(() => {
    const poll = setInterval(fetchGallery, 10000);
    return () => clearInterval(poll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // slideshow timer
  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % gallery.length), 3000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  return (
    <div className="service-card">
      <div className="service-img">
        <img
          key={index}
          src={gallery[index]}
          alt={title}
          style={{ transition: "opacity 0.5s", width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="service-content">
        <h3>{title}</h3>

        {price && <h4 style={{ color: "#059669", marginBottom: "8px", fontSize: "15px" }}>{price}</h4>}

        <p>{desc}</p>
        <a href={link} className="service-btn">Learn More</a>
      </div>
    </div>
  );
}
