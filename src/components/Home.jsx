import { Link } from "react-router-dom";
import AddToCartButton from "../cart/AddToCartButton";
import "./Home.css";

const FEATURED_DISHES = [
  {
    id: 101,
    name: "Combo Platter",
    description: "Injera with doro wat, gomen, kikil and shiro",
    price: 3500,
    image: "/images/beyaynetu.jpg",
  },
  {
    id: 1,
    name: "Doro Wat",
    description: "Spicy chicken stew, served with injera.",
    price: 2500,
    image: "/images/doro-wot.jpg",
  },
  {
    id: 102,
    name: "Vegetarian Platter",
    description: "Lentils, greens, cabbage, beets and more.",
    price: 320,
    image: "/images/Vegetarian Supreme Pizza.png",
  },
  {
    id: 11,
    name: "Beef Burger",
    description: "Juicy beef patty, fresh veggies, cheese & special sauce.",
    price: 600,
    image: "/images/Classic Beef Burger.jpg",
  },
];

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">
            TRADITIONAL FLAVORS <span /> MODERN DELIVERY
          </p>
          <h1 className="hero-title">
            Authentic Ethiopian Food,<strong>Delivered to You</strong>
          </h1>
          <div className="delivery-row">
            <div className="delivery-location">
              <span className="location-pin"></span>
              <span>
                <small>Deliver to</small>
                <b>Addis Ababa, Ethiopia</b>
              </span>
              <span className="chevron"></span>
            </div>
            <Link to="/menu" className="hero-btn primary">
              Order Now <span>→</span>
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Food delivery illustration">
          <img src="/images/hero.jpg" alt="Food delivery" />
        </div>
        <div className="benefits-row">
          <span>
            <b>⌁</b>
            <strong>Fast Delivery</strong>
            <small>Hot & Fresh</small>
          </span>
          <span>
            <b>✿</b>
            <strong>Authentic Taste</strong>
            <small>Traditional Recipes</small>
          </span>
          <span>
            <b>✓</b>
            <strong>Easy Ordering</strong>
            <small>In Few Clicks</small>
          </span>
          <span>
            <b>▣</b>
            <strong>Secure Payment</strong>
            <small>Multiple Options</small>
          </span>
        </div>
      </section>

      <section className="category-strip" aria-label="Food categories">
        {["All", "Doro Wat", "Vegetarian", "Burgers", "Pizza", "Drinks"].map(
          (category, index) => (
            <Link
              to="/menu"
              className={`category-item ${index === 0 ? "selected" : ""}`}
              key={category}
            >
              <span>{["◉", "◌", "◍", "❋", "▰", "◈", "◒"][index]}</span>
              {category}
            </Link>
          ),
        )}
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">POPULAR DISHES</p>
            <h2>
              Our Best Selling <strong>Dishes</strong>
            </h2>
          </div>
          <Link to="/menu">
            View Full Menu <span>→</span>
          </Link>
        </div>
        <div className="dish-preview-grid">
          {FEATURED_DISHES.map((dish, index) => (
            <article className="dish-preview" key={dish.id}>
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
                <span>
                  {index === 0
                    ? "★ Best Seller"
                    : index === 1
                      ? "★ 4.8"
                      : "★ Popular"}
                </span>
              </div>
              <div className="dish-copy">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <div>
                  <b>ETB {dish.price.toLocaleString()}</b>
                  <AddToCartButton dish={dish} size="small" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
