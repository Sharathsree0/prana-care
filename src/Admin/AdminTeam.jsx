import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminTeam() {
  const [team, setTeam] = useState([]);
  
  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imgUrl, setImgUrl] = useState(""); 
  const [loading, setLoading] = useState(false);

  const loadTeam = async () => {
    const data = await dbs.readCollection("site_team");
    setTeam(data);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !role) return alert("Please enter Name and Role");

    setLoading(true);
    
    const finalImg = imgUrl || "https://dummyimage.com/400x400/ccc/000?text=User";

    try {
      const id = Date.now().toString();
      const newMember = { id, name, role, img: finalImg };

      await dbs.addDocument("site_team", id, newMember);
      
      setName("");
      setRole("");
      setImgUrl("");
      loadTeam();

    } catch (err) {
      console.error(err);
      alert("Error adding member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this member?")) return;
    await dbs.deleteDocument("site_team", id);
    loadTeam();
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Manage Specialists</h2>
      </div>

      {/* URL BASED FORM */}
      <div className="stat-card" style={{ marginBottom: "30px", maxWidth: "100%" }}>
        <h3 style={{fontSize: "16px", marginBottom: "15px"}}>Add New Member</h3>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-end" }}>
          
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{fontSize: "12px", color: "#666"}}>Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. John Doe"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
              required
            />
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{fontSize: "12px", color: "#666"}}>Role</label>
            <input 
              type="text" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              placeholder="Senior Nurse"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
              required
            />
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{fontSize: "12px", color: "#666"}}>Photo URL (Paste Link)</label>
            <input 
              type="text" 
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn"
            disabled={loading}
            style={{ height: "38px" }}
          >
            {loading ? "Saving..." : "+ Add Member"}
          </button>
        </form>
      </div>

      <div className="stat-grid">
        {team.map((member) => (
          <div key={member.id} className="stat-card" style={{ textAlign: "center" }}>
            <img
              src={member.img}
              alt={member.name}
              style={{
                width: "80px", height: "80px", borderRadius: "50%",
                objectFit: "cover", marginBottom: "10px"
              }}
            />
            <h3>{member.name}</h3>
            <p style={{ color: "#059669", fontSize: "13px" }}>{member.role}</p>
            <button
              className="action-btn"
              onClick={() => handleDelete(member.id)}
              style={{ marginTop: 15, background: "#fee2e2", color: "crimson" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}