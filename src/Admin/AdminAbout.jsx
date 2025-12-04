import { useEffect, useState } from "react";
import dbs from "../firebase";  // your firebase helper file
import "./Admin.css";

export default function AdminAbout() {
  const [content, setContent] = useState({
    title: "",
    lead: "",
    body: ""
  });

  const [msg, setMsg] = useState("");

  // Load data from Firestore when component loads
  useEffect(() => {
    const fetchContent = async () => {
      const data = await dbs.readDocument("site_content", "about_page");

      if (data) {
        setContent(data);
      } else {
        // If no doc exists yet, create one
        const defaultData = {
          title: "Our Mission",
          lead: "To provide hospital-quality care in the comfort of your home.",
          body: "Founded in 2019, WeCare started with a simple promise..."
        };
        await dbs.addDocument("site_content", "about_page", defaultData);
        setContent(defaultData);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await dbs.updateOrSetDocument("site_content", "about_page", content);

      setMsg("Content updated successfully! ✅");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Something went wrong ❌");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Edit About Page</h2>
      </div>

      <div className="settings-container">
        <div className="stat-card" style={{ maxWidth: "800px" }}>
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
                style={{
                  width: "100%", 
                  padding: "10px", 
                  border: "1px solid #ccc", 
                  borderRadius: "8px"
                }}
              />
            </div>

            <div className="form-group">
              <label>Main Paragraph</label>
              <textarea 
                name="body" 
                rows="6"
                value={content.body} 
                onChange={handleChange}
                style={{
                  width: "100%", 
                  padding: "10px", 
                  border: "1px solid #ccc", 
                  borderRadius: "8px"
                }}
              />
            </div>

            <button className="admin-btn">Save Changes</button>
            {msg && (
              <p style={{
                marginTop: "10px", 
                color: "green", 
                fontWeight: "bold"
              }}>
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
