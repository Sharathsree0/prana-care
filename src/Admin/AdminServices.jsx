// src/Admin/AdminServices.jsx
import "./Admin.css";

export default function AdminServices() {
  const services = [
    { id: 1, title: "Home Nursing", price: "₹800/day", active: true },
    { id: 2, title: "Elderly Care", price: "₹15000/mo", active: true },
    { id: 3, title: "Physiotherapy", price: "₹600/session", active: true },
  ];

  return (
    <section>
      <div className="admin-header-row">
        <h2>Services List</h2>
        <button className="admin-btn">+ Add Service</button>
      </div>

      <div className="stat-grid">
        {services.map((s) => (
          <div key={s.id} className="stat-card service-card-admin">
            <h3>{s.title}</h3>
            <p className="service-price">{s.price}</p>
            <div className="service-status">
              <span className="status-dot"></span> {s.active ? "Active" : "Inactive"}
            </div>
            <div className="service-actions">
              <button className="action-btn-outline">Edit</button>
              <button className="action-btn-outline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}