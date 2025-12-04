import { Outlet, Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import "./Admin.css"
export default function AdminLayout() {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  const navigate = useNavigate();

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar onClose={() => navigate("/admin/login")} />
      <div className="admin-main">
        <AdminTopbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
