export default function Header() {
  return (
    <div className="header">
      <h2 id="page-title">Dashboard</h2>
      <div className="admin-info">
        <span>Hi, Admin</span>
        <i className="fa-solid fa-user-circle"></i>
        <a href="/sources/HTML/SignIn.html" className="logout-from-dashboard">
          <i className="fa-solid fa-power-off"></i> Logout
        </a>
      </div>
    </div>
  );
}
