import { useState } from "react";
import "./Admin.css";

export default function AdminAbout() {
  const [content, setContent] = useState(() => {
    const stored = localStorage.getItem("about_content");
    return stored ? JSON.parse(stored) : {
      title: "Our Mission",
      lead: "To provide hospital-quality care in the comfort of your own home, ensuring dignity, respect, and rapid recovery for every patient.",
      body: "Founded in 2019, WeCare started with a simple promise: treat every patient like our own family. Today, we have helped over 500 families navigate post-surgery recovery and elderly care with ease."
    };
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("about_content", JSON.stringify(content));
    
    window.dispatchEvent(new Event("storage"));
    
    setMsg("Content updated successfully! ✅");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Edit About Page</h2>
      </div>

      <div className="settings-container">
        <div className="stat-card" style={{maxWidth: "800px"}}>
          <h3>Mission Section Text</h3>
          
          <form className="admin-form" onSubmit={handleSave}>
            
            <div className="form-group">
              <label>Section Title</label>
              <input 
                type="text" 
                name="title" 
                value={content.title} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Lead Text (Bold Highlight)</label>
              <textarea 
                name="lead" 
                rows="3"
                value={content.lead} 
                onChange={handleChange}
                style={{width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px"}}
              />
            </div>

            <div className="form-group">
              <label>Main Paragraph</label>
              <textarea 
                name="body" 
                rows="6"
                value={content.body} 
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