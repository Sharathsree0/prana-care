import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";

export default function AdminLogin() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;

    // 1. GET STORED PASSWORD (or use default 'admin123')
    // This allows the password to be changed from the Settings page
    const storedPass = localStorage.getItem("adminPass") || "admin123";

    // 2. CHECK AGAINST STORED PASSWORD
    if (email === "admin@gmail.com" && pass === storedPass) {
      localStorage.setItem("adminAuth", "true");
      
      // Navigate to the main admin layout
      navigate("/admin", { replace: true });
    } else {
      setMessage("Invalid login credentials ❌");
    }
  };

  return (
    <div className="admin-auth">
      <form onSubmit={handleLogin} className="admin-auth-card">
        <h2>Admin Login</h2>

        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        <button type="submit">Login</button>

        {message && <p className="auth-msg">{message}</p>}
      </form>
    </div>
  );
}