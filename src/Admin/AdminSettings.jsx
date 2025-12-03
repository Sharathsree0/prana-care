// src/Admin/AdminSettings.jsx
import "./Admin.css";

export default function AdminSettings() {
  return (
    <section>
      <h2>Settings</h2>
      
      <div className="settings-container">
        {/* Profile Settings */}
        <div className="stat-card">
          <h3>Admin Profile</h3>
          <form className="admin-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" defaultValue="admin@gmail.com" disabled />
            </div>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="********" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <button className="admin-btn">Update Password</button>
          </form>
        </div>

        {/* General Settings */}
        <div className="stat-card">
          <h3>Preferences</h3>
          <div className="preference-item">
            <label>
              <input type="checkbox" defaultChecked /> Receive Email Notifications on New Leads
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input type="checkbox" /> Dark Mode (Coming Soon)
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}