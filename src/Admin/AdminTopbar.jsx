/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import dbs from "../firebase";

export default function AdminTopbar() {
  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "A"
  });

  const loadAdmin = async () => {
    const data = await dbs.readDocument("admin_settings", "profile");

    if (data) {
      setAdmin({
        name: data.name || "Admin",
        email: data.email || "admin@gmail.com",
        avatar: data.avatar || "A"
      });
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h3>Dashboard</h3>
      </div>

      <div className="topbar-right">
        <div className="topbar-user">
          
          <div className="user-avatar">
            {admin.avatar?.startsWith("http")
              ? <img src={admin.avatar} alt="Admin" />
              : admin.avatar || "A"}
          </div>

          <div className="user-meta">
            <div className="user-name">{admin.name}</div>
            <div className="user-email">{admin.email}</div>
          </div>

        </div>
      </div>
    </header>
  );
}
