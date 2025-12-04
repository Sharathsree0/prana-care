/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase"; 

export default function AdminGallery() {
  const [section, setSection] = useState("gallery_hero");
  const [images, setImages] = useState([]);

  const loadGallery = async (targetSection) => {
    const data = await dbs.readCollection(targetSection);
    const formatted = data.map((item) => ({ id: item.id, url: item.url }));
    setImages(formatted);
  };

  useEffect(() => {
    loadGallery(section);
  }, [section]);

  const handleAdd = async () => {
    const url = prompt(`Paste image URL for ${section.replace("gallery_", "").toUpperCase()}:`);
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
          style={{ backgroundColor: "white", color: "#333", border: "1px solid #ccc" }}
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="gallery_hero">Hero (Home Banner)</option>
          <option value="gallery_about">About Us Image</option>
          <option value="gallery_service_1">Service: Home Nursing</option>
          <option value="gallery_service_2">Service: Elderly Care</option>
          <option value="gallery_service_3">Service: Physiotherapy</option>
        </select>

        <button className="admin-btn" onClick={handleAdd}>
          + Add Photo
        </button>
      </div>

      <div className="stat-grid">
        {images.length === 0 && (
          <p style={{ color: "#888" }}>No images in this section yet.</p>
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
