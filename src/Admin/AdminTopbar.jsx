// AdminTopbar.jsx

export default function AdminTopbar() {
  const adminEmail = "admin@gmail.com"; // show static; replace with real profile later
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h3>Dashboard</h3>
      </div>

      <div className="topbar-right">
        <div className="topbar-user">
          <div className="user-avatar">A</div>
          <div className="user-meta">
            <div className="user-name">Admin</div>
            <div className="user-email">{adminEmail}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
