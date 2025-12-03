import { useState } from "react";
import "./Admin.css";

export default function AdminSettings() {
  // 1. State to hold the input value and status messages
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    // 2. Simple validation
    if (newPassword.length < 4) {
      setMessage("Password must be at least 4 characters ❌");
      return;
    }

    // 3. Save to LocalStorage (This is what AdminLogin.jsx checks!)
    localStorage.setItem("adminPass", newPassword);
    
    setMessage("Password updated successfully! ✅");
    setNewPassword(""); // Clear the field
  };

  return (
    <section>
      <h2>Settings</h2>
      
      <div className="settings-container">
        {/* Profile Settings */}
        <div className="stat-card">
          <h3>Admin Profile</h3>
          
          {/* 4. Attach the submit handler */}
          <form className="admin-form" onSubmit={handlePasswordUpdate}>
            
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" defaultValue="admin@gmail.com" disabled />
            </div>

            {/* Optional: You can add a "Current Password" check here if you want to be stricter */}
            
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

            {/* 5. Show success/error message */}
            {message && <p style={{marginTop: "10px", fontWeight: "bold"}}>{message}</p>}
          </form>
        </div>

        {/* General Settings (Visual only for now) */}
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