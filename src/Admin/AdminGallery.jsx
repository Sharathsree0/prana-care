/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase"; 

export default function AdminGallery() {
  const [section, setSection] = useState("gallery_hero");
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await dbs.readCollection("services");
      setServices(data || []);
    };
    fetchServices();
  }, []);

  const loadGallery = async (targetSection) => {
    const data = await dbs.readCollection(targetSection);
    const formatted = data.map((item) => ({ id: item.id, url: item.url }));
    setImages(formatted);
  };

  useEffect(() => {
    loadGallery(section);
  }, [section]);

  const handleAdd = async () => {
    let nameForPrompt = section;
    if (section.startsWith("gallery_service_")) {
        nameForPrompt = "Service Gallery";
    } else {
        nameForPrompt = section.replace("gallery_", "").toUpperCase();
    }

    const url = prompt(`Paste image URL for ${nameForPrompt}:`);
    if (!url) return;

    const docId = crypto.randomUUID();
    await dbs.addDocument(section, docId, { url });
    loadGallery(section);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this image?")) return;

    await dbs.deleteDocument(section, id);
    loadGallery(section);
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Website Gallery Manager</h2>

        <select
          className="admin-btn"
          style={{ backgroundColor: "white", color: "#333", border: "1px solid #ccc", maxWidth: "300px" }}
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="gallery_hero">Hero (Home Banner)</option>
          <option value="gallery_about">About Us Image</option>
          
           {services.map((s) => (
            <option key={s.id} value={`gallery_service_${s.id}`}>
              Service: {s.title}
            </option>
          ))}
        </select>

        <button className="admin-btn" onClick={handleAdd}>
          + Add Photo
        </button>
      </div>

      <div className="stat-grid">
        {images.length === 0 && (
          <p style={{ color: "#888", width: "100%" }}>No images in this section yet.</p>
        )}

        {images.map((img) => (
          <div key={img.id} className="stat-card" style={{ padding: 10 }}>
            <img
              src={img.url}
              alt="Gallery"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <button
              className="action-btn"
              onClick={() => handleDelete(img.id)}
              style={{
                marginTop: 10,
                width: "100%",
                background: "#fee2e2",
                color: "crimson",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}