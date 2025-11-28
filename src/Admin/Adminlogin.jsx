import { useState } from "react";
import "./AdminAuth.css";

export default function AdminLogin() {
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;

    if (email === "admin@gmail.com" && pass === "admin123") {
      localStorage.setItem("adminAuth", "true");
      window.location.href = "/admin/dashboard";
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
