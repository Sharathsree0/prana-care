/* eslint-disable react-hooks/set-state-in-effect */
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dbs from "../firebase";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const [branding, setBranding] = useState({
    symbol: "PC",
    name: "Prana_Care",
    sub: "Admin"
  });

  const loadBranding = async () => {
    const data = await dbs.readDocument("site_settings", "branding");
    if (data) {
      setBranding({
        symbol: data.admin_symbol || "PC",
        name: data.admin_brand || "Prana_Care",
        sub: data.admin_sub || "Admin"
      });
    }
  };

  useEffect(() => {
    loadBranding();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      
      <div className="admin-brand">
        <div className="brand-symbol">{branding.symbol}</div>
        <div>
          <div className="brand-name">{branding.name}</div>
          <div className="brand-sub">{branding.sub}</div>
        </div>
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin" end className="nav-item">Dashboard</NavLink>
        <NavLink to="/admin/leads" className="nav-item">Leads</NavLink>
        <NavLink to="/admin/team" className="nav-item">Team</NavLink>
        <NavLink to="/admin/services" className="nav-item">Services</NavLink>
        <NavLink to="/admin/gallery" className="nav-item">Gallery</NavLink>
        <NavLink to="/admin/home" className="nav-item">Home Info</NavLink>
        <NavLink to="/admin/about" className="nav-item">About Info</NavLink>
        <NavLink to="/admin/footer" className="nav-item">Footer Info</NavLink>
        <NavLink to="/admin/settings" className="nav-item">Settings</NavLink>
      </nav>

      <div className="admin-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </aside>
  );
}
