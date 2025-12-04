/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);

  const loadLeads = async () => {
    const data = await dbs.readCollection("admin_leads");
    setLeads(data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await dbs.deleteDocument("admin_leads", id);
    loadLeads();
  };

  const handleStatusChange = async (id, newStatus) => {
    await dbs.updateDocument("admin_leads", id, { status: newStatus });
    loadLeads();
  };

  return (
    <section>
      <div className="admin-header-row">
        <h2>Leads Management</h2>
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
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                  No leads found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>

                  <td>
                    <a
                      href={`tel:${lead.phone}`}
                      style={{ textDecoration: "none", color: "#059669" }}
                    >
                      {lead.phone}
                    </a>
                  </td>

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
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(lead.id)}
                      style={{ color: "crimson", background: "#fee2e2" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
