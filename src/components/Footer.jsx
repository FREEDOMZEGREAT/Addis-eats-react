import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            🍛 Addis Eats
          </Link>
          <p>Authentic flavors from Addis, delivered to your door.</p>
        </div>
        <div className="footer-links-group">
          <h2>Explore</h2>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About us</Link>
          <Link to="/orders">Order history</Link>
        </div>
        <div className="footer-links-group">
          <h2>Quick links</h2>
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Addis Eats - Made in Ethiopia</p>
          <p className="footer-note">All prices in Ethiopian Birr (ETB)</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
