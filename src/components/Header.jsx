import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartBadge from "../cart/CartBadge";
import ThemeToggle from "../theme/ThemeToggle";
import { useFavoriteCount } from "../favorites/favoritesStore";
import { useOrderCount } from "../orders/orderHistoryStore";
import { useAuth } from "../auth/useAuth";
import "./Header.css";

function Header() {
  const favCount = useFavoriteCount();
  const orderCount = useOrderCount();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="header-logo">
          <span className="logo-icon">🍛</span>
          <div>
            <h1 className="logo-name">Addis Eats</h1>
            <p className="logo-tagline">Ethiopian Food Delivery</p>
          </div>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-icon" aria-hidden="true">
            ☰
          </span>
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <nav
          id="main-navigation"
          className={`header-nav ${menuOpen ? "is-open" : ""}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Menu
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Orders
            {orderCount > 0 && <span className="nav-count">{orderCount}</span>}
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Favorites
            {favCount > 0 && <span className="nav-count">{favCount}</span>}
          </NavLink>
          <ThemeToggle />
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link cart-link ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            🛒 Cart <CartBadge />
          </NavLink>
          {user ? (
            <button
              type="button"
              className="nav-link auth-button"
              onClick={handleLogout}
            >
              Sign out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="nav-link auth-link"
              onClick={closeMenu}
            >
              Sign in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
