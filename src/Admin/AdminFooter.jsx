/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminFooter() {
  const [footer, setFooter] = useState({
    logoPrefix: "PranaHome", // First part (Green)
    logoSuffix: "Care",      // Second part (White)
    desc: "Professional home nursing and elderly care services delivered with compassion.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    phone: "+91 9092630929",
    email: "help@pranacare.com",
    copyrightText: "PranaCare", 
    links: [
      { label: "Home", link: "#home" },
      { label: "About Us", link: "#about" },
      { label: "Services", link: "#services" },
      { label: "Contact", link: "#contact" }
    ],
    services: [
      "Elderly Care",
      "Post-Surgery Nursing",
      "Physiotherapy",
      "Mother & Baby Care"
    ]
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadFooterData = async () => {
      const data = await dbs.readDocument("site_settings", "footer");
      if (data) {
        setFooter((prev) => ({ ...prev, ...data }));
      } else {
        await dbs.addDocument("site_settings", "footer", footer);
      }
    };
    loadFooterData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFooter({ ...footer, [name]: value });
  };

  const handleServicesChange = (e) => {
    const value = e.target.value;
    const array = value.split(",").map(item => item.trim());
    setFooter({ ...footer, services: array });
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...footer.links];
    newLinks[index][field] = value;
    setFooter({ ...footer, links: newLinks });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dbs.updateOrSetDocument("site_settings", "footer", footer);
      setMsg("Footer updated successfully! ✅");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error saving footer ❌");
    }
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Edit Footer</h2>
      </div>

      <div className="settings-container">
        <div className="stat-card" style={{ maxWidth: "800px" }}>
          <h3>Footer Information</h3>

          <form className="admin-form" onSubmit={handleSave}>
            
            {/* SPLIT LOGO INPUTS */}
            <div className="form-group">
              <label>Footer Logo</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input 
                  type="text" 
                  name="logoPrefix" 
                  placeholder="Green Part (e.g. Prana)"
                  value={footer.logoPrefix || ""} 
                  onChange={handleChange}
                  style={{ flex: 1 }}
                />
                <input 
                  type="text" 
                  name="logoSuffix" 
                  placeholder="White Part (e.g. Care)"
                  value={footer.logoSuffix || ""} 
                  onChange={handleChange} 
                  style={{ flex: 1 }}
                />
              </div>
              <small style={{ color: "#666" }}>First box is Green, Second box is White.</small>
            </div>

            <div className="form-group">
              <label>Footer Description</label>
              <textarea name="desc" rows="3" value={footer.desc} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }} />
            </div>

            <div className="form-group">
              <label>Services List (Separate with commas)</label>
              <textarea 
                rows="3"
                value={(footer.services || []).join(", ")} 
                onChange={handleServicesChange} 
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }} 
              />
            </div>

            <div className="form-group">
              <label>Quick Links</label>
              {footer.links.map((link, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                  <input type="text" value={link.label} onChange={(e) => handleLinkChange(index, 'label', e.target.value)} placeholder="Label" style={{ flex: 1 }} />
                  <input type="text" value={link.link} onChange={(e) => handleLinkChange(index, 'link', e.target.value)} placeholder="URL (#home)" style={{ flex: 1 }} />
                </div>
              ))}
            </div>

            <div className="form-group">
              <label>Copyright Name</label>
              <input type="text" name="copyrightText" value={footer.copyrightText || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Facebook Link</label>
              <input type="text" name="facebook" value={footer.facebook} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Instagram Link</label>
              <input type="text" name="instagram" value={footer.instagram} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Footer Phone</label>
              <input type="text" name="phone" value={footer.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Footer Email</label>
              <input type="text" name="email" value={footer.email} onChange={handleChange} />
            </div>

            <button className="admin-btn">Save Footer</button>
            
            {msg && <p style={{ marginTop: "10px", fontWeight: "bold", color: "green" }}>{msg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}