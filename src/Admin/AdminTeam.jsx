import { useState } from "react";
import "./Admin.css";
export default function AdminTeam() {
  const [team, setTeam] = useState(() => {
    const stored = localStorage.getItem("adminTeam");
    return stored ? JSON.parse(stored) : [
      { id: 1, name: "Dr. Sarah Johnson", role: "Chief Medical Officer", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
      { id: 2, name: "James Wilson", role: "Senior Physiotherapist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" },
    ];
  });

  const updateTeam = (newTeam) => {
    setTeam(newTeam);
    localStorage.setItem("adminTeam", JSON.stringify(newTeam));
    window.dispatchEvent(new Event("storage"));
  };

  const handleAdd = () => {
    const name = prompt("Enter Specialist Name:");
    if (!name) return;
    const role = prompt("Enter Role (e.g. Senior Nurse):");
    const img = prompt("Paste Image URL:");
    
    const finalImg = img || "https://dummyimage.com/400x400/ccc/000?text=User";

    const newMember = { id: Date.now(), name, role, img: finalImg };
    updateTeam([...team, newMember]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this member?")) {
      updateTeam(team.filter((m) => m.id !== id));
    }
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Manage Specialists</h2>
        <button className="admin-btn" onClick={handleAdd}>+ Add Member</button>
      </div>

      <div className="stat-grid">
        {team.map((member) => (
          <div key={member.id} className="stat-card" style={{textAlign: "center"}}>
            <img 
              src={member.img} 
              alt={member.name} 
              style={{width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px"}}
            />
            <h3>{member.name}</h3>
            <p style={{color: "#059669", fontSize: "13px"}}>{member.role}</p>
            <button 
              className="action-btn" 
              onClick={() => handleDelete(member.id)}
              style={{marginTop: 15, background: "#fee2e2", color: "crimson"}}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}