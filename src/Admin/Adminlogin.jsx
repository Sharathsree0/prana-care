/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";
import dbs from "../firebase"; 

export default function AdminLogin() {
  const [message, setMessage] = useState("");
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();

  const loadAuthData = async () => {
    console.log("HI")
    const data = await dbs.readDocument("admin_settings", "auth");
    const user = JSON.parse(localStorage.getItem("adminAuth"))
    if(user){
      navigate("/admin");
    }
    if (!data) {

      await dbs.addDocument("admin_settings", "auth", {
        email: "admin@gmail.com",
        password: "admin123",
      });
      setAuthData({ email: "admin@gmail.com", password: "admin123" });
    } else {
      setAuthData(data);
    }
  };
console.log(authData)
  useEffect(() => {
    loadAuthData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;
    if (!authData) {
      setMessage("Loading admin authentication... ⏳");
      return;
    }

    if (email === authData.email && pass === authData.password) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
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
