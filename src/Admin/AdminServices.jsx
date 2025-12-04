/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminServices() {
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    const data = await dbs.readCollection("services");
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleAdd = async () => {
    const title = prompt("Enter Service Name:");
    if (!title) return;

    const price = prompt("Enter Price (e.g. ₹500/day):");
    if (!price) return;

    const id = Date.now().toString();

    const newService = {
      id,
      title,
      price,
      active: true
    };

    await dbs.addDocument("services", id, newService);
    loadServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await dbs.deleteDocument("services", id);
    loadServices();
  };

  const toggleStatus = async (id) => {
    const s = services.find((item) => item.id === id);

    await dbs.updateDocument("services", id, {
      active: !s.active
    });

    loadServices();
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Services List</h2>
        <button className="admin-btn" onClick={handleAdd}>
          + Add Service
        </button>
      </div>

      <div className="stat-grid">
        {services.map((s) => (
          <div
            key={s.id}
            className="stat-card service-card-admin"
            style={{ opacity: s.active ? 1 : 0.6 }}
          >
            <h3>{s.title}</h3>
            <p className="service-price">{s.price}</p>

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
