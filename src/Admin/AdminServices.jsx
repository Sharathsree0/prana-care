import { useState } from "react";
import "./Admin.css";

export default function AdminServices() {
  const [services, setServices] = useState(() => {
    const storedServices = localStorage.getItem("adminServices");
    return storedServices ? JSON.parse(storedServices) : [
      { id: 1, title: "Home Nursing", price: "₹800/day", active: true },
      { id: 2, title: "Elderly Care", price: "₹15000/mo", active: true },
      { id: 3, title: "Physiotherapy", price: "₹600/session", active: true },
    ];
  });

  const updateServices = (newData) => {
    setServices(newData);
    localStorage.setItem("adminServices", JSON.stringify(newData));
    
    window.dispatchEvent(new Event("storage"));
  };

  const handleAdd = () => {
    const title = prompt("Enter Service Name:");
    if (!title) return;
    const price = prompt("Enter Price (e.g. ₹500/day):");
    if (!price) return;

    const newService = { id: Date.now(), title, price, active: true };
    updateServices([...services, newService]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this service?")) {
      updateServices(services.filter((s) => s.id !== id));
    }
  };

  const toggleStatus = (id) => {
    updateServices(services.map((s) => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Services List</h2>
        <button className="admin-btn" onClick={handleAdd}>+ Add Service</button>
      </div>

      <div className="stat-grid">
        {services.map((s) => (
          <div key={s.id} className="stat-card service-card-admin" style={{ opacity: s.active ? 1 : 0.6 }}>
            <h3>{s.title}</h3>
            <p className="service-price">{s.price}</p>
            
            <div className="service-status">
              <span className="status-dot" style={{background: s.active ? '#10b981' : '#cbd5e1'}}></span> 
              {s.active ? "Active" : "Inactive"}
            </div>
            
            <div className="service-actions">
              <button className="action-btn-outline" onClick={() => toggleStatus(s.id)}>
                {s.active ? "Disable" : "Enable"}
              </button>
              <button className="action-btn-outline" onClick={() => handleDelete(s.id)} style={{color:'crimson'}}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}