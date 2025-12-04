import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

export default function AdminDashboard() {
  
  const getStats = () => {
    const leads = JSON.parse(localStorage.getItem("adminLeads") || "[]");
    const services = JSON.parse(localStorage.getItem("adminServices") || "[]");
    
    return {
      stats: [
        { id: 1, label: "Total Leads", value: leads.length },
        { id: 2, label: "Open Leads", value: leads.filter(l => l.status !== "Closed").length },
        { id: 3, label: "Services", value: services.length },
        { id: 4, label: "Satisfaction", value: "4.9★" },
      ],
      recentLeads: leads.slice(0, 3)
    };
  };

  const [data, setData] = useState(getStats);

  useEffect(() => {
    const handleStorage = () => setData(getStats());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="dash-welcome">
        <h2>Welcome back, Admin 👋</h2>
        <p>Here is what's happening with your business today.</p>
      </div>

      <div className="stat-grid">
        {data.stats.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <div className="admin-header-row">
          <h3>Recent Leads</h3>
          <Link to="/admin/leads" className="action-btn-outline" style={{textDecoration:'none'}}>View All</Link>
        </div>

        <div className="recent-list">
          {data.recentLeads.length === 0 ? <p style={{color: "#94a3b8"}}>No leads yet.</p> : 
            data.recentLeads.map((r) => (
              <div key={r.id} className="recent-item">
                <div>
                  <div className="recent-name">{r.name}</div>
                  <div className="recent-service">{r.service}</div>
                </div>
                <div style={{textAlign: "right"}}>
                  <div className="recent-phone">{r.phone}</div>
                  <span className={`status-badge status-${r.status.toLowerCase()}`}>{r.status}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}