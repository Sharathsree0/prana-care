// src/Admin/AdminGallery.jsx
import { useState } from "react";
import "./Admin.css";

export default function AdminGallery() {
  // 1. Manage the active section
  const [section, setSection] = useState("gallery_hero");

  // 2. FIX: Lazy Initialize images for the default section
  // This loads the "Hero" images immediately on first load, so no useEffect is needed.
  const [images, setImages] = useState(() => {
    const stored = localStorage.getItem("gallery_hero");
    return stored ? JSON.parse(stored) : [];
  });

  // 3. Save to LocalStorage whenever images change
  const updateGallery = (newImages) => {
    setImages(newImages);
    localStorage.setItem(section, JSON.stringify(newImages));
  };

  // 4. FIX: Handle Section Change (Load data here instead of useEffect)
  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    setSection(newSection); // Update dropdown UI

    // Fetch data for the new section immediately
    const stored = localStorage.getItem(newSection);
    if (stored) {
      setImages(JSON.parse(stored));
    } else {
      setImages([]);
    }
  };

  const handleAdd = () => {
    const url = prompt(`Paste image URL for ${section.replace("gallery_", "").toUpperCase()}:`);
    if (url) {
       updateGallery([...images, url]);
    }
  };

  const handleDelete = (indexToDelete) => {
    if (window.confirm("Remove this image?")) {
      updateGallery(images.filter((_, index) => index !== indexToDelete));
    }
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Website Gallery Manager</h2>
        
        {/* DROPDOWN TO SELECT SECTION */}
        <select 
          className="admin-btn" 
          style={{backgroundColor: "white", color: "#333", border: "1px solid #ccc"}}
          value={section}
          onChange={handleSectionChange} // <--- Calls our new handler
        >
          <option value="gallery_hero">Hero (Home Banner)</option>
          <option value="gallery_about">About Us Image</option>
          <option value="gallery_service_1">Service: Home Nursing</option>
          <option value="gallery_service_2">Service: Elderly Care</option>
          <option value="gallery_service_3">Service: Physiotherapy</option>
        </select>

        <button className="admin-btn" onClick={handleAdd}>+ Add Photo</button>
      </div>

      <div className="stat-grid">
        {images.length === 0 && <p style={{color: '#888'}}>No images in this section yet.</p>}
        
        {images.map((img, index) => (
          <div key={index} className="stat-card" style={{padding: 10}}>
            <img 
              src={img} 
              alt="Gallery" 
              style={{width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px"}} 
            />
            <button 
              className="action-btn" 
              onClick={() => handleDelete(index)}
              style={{marginTop: 10, width: "100%", background: "#fee2e2", color: "crimson"}}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}