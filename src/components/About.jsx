import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <article className="about-card">
        <div className="about-card-image">
          <img src="/images/hero.jpg" alt="Fresh food ready for delivery" />
        </div>
        <div className="about-card-content">
          <p className="eyebrow">ABOUT ADDIS EATS</p>
          <h1>Good food, rooted in Addis.</h1>
          <p className="about-description">
            Addis Eats is a food delivery system that connects you with
            authentic Ethiopian meals and favorite international dishes. Browse
            the menu, add your choices to the cart, place an order, and follow
            its progress from your order history.
          </p>
          <div className="about-card-details">
            <span>Fresh meals</span>
            <span>Easy ordering</span>
            <span>Reliable delivery</span>
          </div>
          <Link to="/menu" className="about-cta-link">
            Browse the menu <span>→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

export default About;
