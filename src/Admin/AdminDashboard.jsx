/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    openLeads: 0,
    servicesCount: 0,
    recentLeads: []
  });

  const loadDashboardData = async () => {
    
    const leads = await dbs.readCollection("admin_leads");

    const services = await dbs.readCollection("services");

    setStats({
      totalLeads: leads.length,
      openLeads: leads.filter((l) => l.status !== "Closed").length,
      servicesCount: services.length,
      recentLeads: leads.slice(0, 3) 
    });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <section className="admin-dashboard">
      
      <div className="dash-welcome">
        <h2>Welcome back, Admin 👋</h2>
        <p>Here is what's happening with your business today.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalLeads}</div>
          <div className="stat-label">Total Leads</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.openLeads}</div>
          <div className="stat-label">Open Leads</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.servicesCount}</div>
          <div className="stat-label">Services</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">4.9★</div>
          <div className="stat-label">Satisfaction</div>
        </div>
      </div>

      <div className="recent-section">
        <div className="admin-header-row">
          <h3>Recent Leads</h3>
          <Link
            to="/admin/leads"
            className="action-btn-outline"
            style={{ textDecoration: "none" }}
          >
            View All
          </Link>
        </div>

        <div className="recent-list">
          {stats.recentLeads.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No leads yet.</p>
          ) : (
            stats.recentLeads.map((r) => (
              <div key={r.id} className="recent-item">
                <div>
                  <div className="recent-name">{r.name}</div>
                  <div className="recent-service">{r.service}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div className="recent-phone">{r.phone}</div>
                  <span
                    className={`status-badge status-${r.status.toLowerCase()}`}
                  >
                    {r.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </section>
  );
}
