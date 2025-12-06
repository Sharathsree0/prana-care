import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase"; 

export default function AdminGallery() {
  const [section, setSection] = useState("gallery_hero");
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [uploading, setUploading] = useState(false); // To show loading state

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

  // NEW: Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
        // Upload to Firebase Storage
        const url = await dbs.uploadImage(file, section);
        
        // Save URL to Firestore
        const docId = crypto.randomUUID();
        await dbs.addDocument(section, docId, { url });
        
        // Refresh
        loadGallery(section);
    } catch (err) {
        alert("Error uploading image.");
        console.error(err);
    } finally {
        setUploading(false);
        // Clear input so same file can be selected again if needed
        e.target.value = null; 
    }
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

        {/* HIDDEN FILE INPUT */}
        <input 
            type="file" 
            id="gallery-upload" 
            style={{ display: "none" }} 
            accept="image/*"
            onChange={handleFileUpload}
        />

        {/* BUTTON TRIGGERS INPUT */}
        <button 
            className="admin-btn" 
            onClick={() => document.getElementById("gallery-upload").click()}
            disabled={uploading}
        >
          {uploading ? "Uploading... ⏳" : "+ Upload Photo"}
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