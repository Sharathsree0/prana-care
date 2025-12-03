import { useState, useEffect } from "react";
import "./Admin.css";

export default function AdminLeads() {
  // FIX: Initialize state directly from LocalStorage
  const [leads, setLeads] = useState(() => {
    const storedLeads = localStorage.getItem("adminLeads");
    return storedLeads ? JSON.parse(storedLeads) : [
      { id: 1, name: "Ramesh Kumar", phone: "9876543210", service: "Home Nursing", status: "New", date: "2023-10-24" },
      { id: 2, name: "Sita Devi", phone: "9123456789", service: "Physiotherapy", status: "Contacted", date: "2023-10-23" },
    ];
  });

  // Save changes whenever 'leads' updates
  useEffect(() => {
    localStorage.setItem("adminLeads", JSON.stringify(leads));
  }, [leads]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this lead?")) {
      setLeads(leads.filter((l) => l.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads(leads.map((l) => 
      l.id === id ? { ...l, status: newStatus } : l
    ));
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Leads Management</h2>
        <button className="admin-btn" onClick={() => alert("Export feature coming soon!")}>Export CSV</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td><a href={`tel:${lead.phone}`} style={{textDecoration:'none', color:'#059669'}}>{lead.phone}</a></td>
                <td>{lead.service}</td>
                <td>{lead.date}</td>
                <td>
                  <select 
                    className={`status-badge status-${lead.status.toLowerCase()}`}
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td>
                  <button className="action-btn" onClick={() => handleDelete(lead.id)} style={{color: 'crimson', background: '#fee2e2'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p style={{padding:20, textAlign:'center', color:'#888'}}>No leads found.</p>}
      </div>
    </section>
  );
}