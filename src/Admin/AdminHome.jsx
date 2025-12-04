import { useState } from "react";
import "./Admin.css";

export default function AdminHome() {
  // 1. Lazy Load content
  const [content, setContent] = useState(() => {
    const stored = localStorage.getItem("hero_content");
    return stored ? JSON.parse(stored) : {
      tagline: "Home Nursing • Elderly Care • Physiotherapy",
      title: "Compassionate Care,",
      highlight: "Right at Your Home",
      desc: "Professional nursing, elderly care, and physiotherapy services delivered with love and expertise. We treat your family like our own."
    };
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // 2. Save to Storage
    localStorage.setItem("hero_content", JSON.stringify(content));
    
    // 3. Trigger Live Update
    window.dispatchEvent(new Event("storage"));
    
    setMsg("Home page updated successfully! ✅");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Edit Home Page</h2>
      </div>

      <div className="settings-container">
        <div className="stat-card" style={{maxWidth: "800px"}}>
          <h3>Hero Section Text</h3>
          
          <form className="admin-form" onSubmit={handleSave}>
            
            <div className="form-group">
              <label>Tagline (Top small text)</label>
              <input 
                type="text" 
                name="tagline" 
                value={content.tagline} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Main Title (First Line)</label>
              <input 
                type="text" 
                name="title" 
                value={content.title} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Highlighted Title (Green Text)</label>
              <input 
                type="text" 
                name="highlight" 
                value={content.highlight} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Description Paragraph</label>
              <textarea 
                name="desc" 
                rows="4"
                value={content.desc} 
                onChange={handleChange}
                style={{width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px"}}
              />
            </div>

            <button className="admin-btn">Save Changes</button>
            {msg && <p style={{marginTop: "10px", color: "green", fontWeight: "bold"}}>{msg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}