import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  
  // Form State
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState(""); 
  const [loading, setLoading] = useState(false);

  const loadServices = async () => {
    const data = await dbs.readCollection("services");
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) return alert("Enter Service Name");

    setLoading(true);
    const id = Date.now().toString();

    try {
      const newService = { id, title, active: true };
      await dbs.addDocument("services", id, newService);

      if (imgUrl) {
        const galleryId = Date.now().toString();
        await dbs.addDocument(`gallery_service_${id}`, galleryId, { url: imgUrl });
      }

      setTitle("");
      setImgUrl("");
      loadServices();

    } catch (err) {
      console.error(err);
      alert("Error creating service");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await dbs.deleteDocument("services", id);
    loadServices();
  };

  const toggleStatus = async (id) => {
    const s = services.find((item) => item.id === id);
    await dbs.updateDocument("services", id, { active: !s.active });
    loadServices();
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Services List</h2>
      </div>

      {/* URL BASED FORM */}
      <div className="stat-card" style={{ marginBottom: "30px", maxWidth: "100%" }}>
        <h3 style={{fontSize: "16px", marginBottom: "15px"}}>Add New Service</h3>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-end" }}>
          
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{fontSize: "12px", color: "#666"}}>Service Name</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Baby Care"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
              required
            />
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{fontSize: "12px", color: "#666"}}>Cover Image URL (Optional)</label>
            <input 
              type="text" 
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="https://..."
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn"
            disabled={loading}
            style={{ height: "38px" }}
          >
            {loading ? "Saving..." : "+ Add Service"}
          </button>
        </form>
      </div>

      <div className="stat-grid">
        {services.map((s) => (
          <div
            key={s.id}
            className="stat-card service-card-admin"
            style={{ opacity: s.active ? 1 : 0.6 }}
          >
            <h3>{s.title}</h3>

            <div className="service-status">
              <span
                className="status-dot"
                style={{ background: s.active ? "#10b981" : "#cbd5e1" }}
              ></span>
              {s.active ? "Active" : "Inactive"}
            </div>

            <div className="service-actions">
              <button
                className="action-btn-outline"
                onClick={() => toggleStatus(s.id)}
              >
                {s.active ? "Disable" : "Enable"}
              </button>

              <button
                className="action-btn-outline"
                onClick={() => handleDelete(s.id)}
                style={{ color: "crimson" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}