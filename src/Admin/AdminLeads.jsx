// src/Admin/AdminLeads.jsx
import "./Admin.css";

export default function AdminLeads() {
  // Mock data - in a real app, this comes from a database
  const leads = [
    { id: 1, name: "Ramesh Kumar", phone: "+91 98765 43210", service: "Home Nursing", status: "New", date: "2023-10-24" },
    { id: 2, name: "Sita Devi", phone: "+91 91234 56789", service: "Physiotherapy", status: "Contacted", date: "2023-10-23" },
    { id: 3, name: "Ajay Singh", phone: "+91 99887 76655", service: "Elderly Care", status: "Closed", date: "2023-10-22" },
  ];

  return (
    <section>
      <div className="admin-header-row">
        <h2>Leads Management</h2>
        <button className="admin-btn">Export CSV</button>
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
                <td>{lead.phone}</td>
                <td>{lead.service}</td>
                <td>{lead.date}</td>
                <td>
                  <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                    {lead.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">Call</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}