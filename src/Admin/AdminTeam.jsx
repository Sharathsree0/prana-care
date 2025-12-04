/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminTeam() {
  const [team, setTeam] = useState([]);

  const loadTeam = async () => {
    const data = await dbs.readCollection("site_team");
    setTeam(data);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleAdd = async () => {
    const name = prompt("Enter Specialist Name:");
    if (!name) return;

    const role = prompt("Enter Role (e.g. Senior Nurse):");

    const img = prompt("Paste Image URL (optional):");
    const finalImg = img || "https://dummyimage.com/400x400/ccc/000?text=User";

    const id = Date.now().toString();

    const newMember = { id, name, role, img: finalImg };

    await dbs.addDocument("site_team", id, newMember);

    loadTeam();
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
        <button className="admin-btn" onClick={handleAdd}>+ Add Member</button>
      </div>

      <div className="stat-grid">
        {team.map((member) => (
          <div key={member.id} className="stat-card" style={{ textAlign: "center" }}>
            
            <img
              src={member.img}
              alt={member.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px"
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
