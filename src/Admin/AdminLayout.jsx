/* eslint-disable react-hooks/set-state-in-effect */
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { useEffect, useState } from "react";
import "./Admin.css";

export default function AdminLayout() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const session = localStorage.getItem("adminAuth");

    if (session === "true") {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return null;

  if (!isAuth) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
