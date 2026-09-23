import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import "./AdminLayout.css";

function AdminLayout() {
  const admin = useAdminAuth((state) => state.admin);
  const logout = useAdminAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Log out of admin panel?")) {
      logout();
      navigate("/admin/login");
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="admin-logo-icon">🍛</span>
          <div>
            <h2>Addis Eats</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
            end
          >
            <span>📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>🍽️</span>
            <span>Menu</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>📦</span>
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>🛍️</span>
            <span>Customer Page</span>
          </NavLink>
        </nav>

        <div className="admin-user">
          <div className="admin-user-info">
            <span className="admin-avatar">👤</span>
            <div>
              <p className="admin-name">{admin?.name || "Admin"}</p>
              <p className="admin-role">Administrator</p>
            </div>
          </div>
          <button className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
