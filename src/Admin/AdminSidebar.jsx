// AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    // optional: clear other admin data
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="brand-symbol">WC</div>
        <div>
          <div className="brand-name">WeCare</div>
          <div className="brand-sub">Admin</div>
        </div>
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin" end className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/admin/leads" className="nav-item">
          Leads
        </NavLink>

        <NavLink to="/admin/services" className="nav-item">
          Services
        </NavLink>
        
        <NavLink to="/admin/gallery" className="nav-item">Gallery
        </NavLink>

        <NavLink to="/admin/settings" className="nav-item">
          Settings
        </NavLink>
      </nav>

      <div className="admin-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
