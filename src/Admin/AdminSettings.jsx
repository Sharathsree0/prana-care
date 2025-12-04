import { useState } from "react";
import "./Admin.css";

export default function AdminSettings() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (newPassword.length < 4) {
      setMessage("Password must be at least 4 characters ❌");
      return;
    }

    localStorage.setItem("adminPass", newPassword);
    
    setMessage("Password updated successfully! ✅");
    setNewPassword(""); 
  };

  return (
    <section>
      <h2>Settings</h2>
      
      <div className="settings-container">
        <div className="stat-card">
          <h3>Admin Profile</h3>
          
          <form className="admin-form" onSubmit={handlePasswordUpdate}>
            
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" defaultValue="admin@gmail.com" disabled />
            </div>

            
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="text" 
                placeholder="Enter new password" 
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="admin-btn">Update Password</button>

            {message && <p style={{marginTop: "10px", fontWeight: "bold"}}>{message}</p>}
          </form>
        </div>

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