// AdminDashboard.jsx

export default function AdminDashboard() {
  // mock stats (replace with real API later)
  const stats = [
    { id: 1, label: "Total Leads", value: 128 },
    { id: 2, label: "Open Leads", value: 12 },
    { id: 3, label: "Services", value: 8 },
    { id: 4, label: "Satisfaction", value: "4.9★" },
  ];

  const recent = [
    { id: 1, name: "Ramesh", service: "Home Nursing", phone: "+91 98..." },
    { id: 2, name: "Sita", service: "Physiotherapy", phone: "+91 98..." },
    { id: 3, name: "Ajay", service: "Elderly Care", phone: "+91 98..." },
  ];

  return (
    <section className="admin-dashboard">
      <div className="dash-welcome">
        <h2>Welcome back, Admin 👋</h2>
        <p>Overview of today and recent activity</p>
      </div>

      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>Recent Leads</h3>
        <div className="recent-list">
          {recent.map((r) => (
            <div key={r.id} className="recent-item">
              <div>
                <div className="recent-name">{r.name}</div>
                <div className="recent-service">{r.service}</div>
              </div>
              <div className="recent-phone">{r.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
