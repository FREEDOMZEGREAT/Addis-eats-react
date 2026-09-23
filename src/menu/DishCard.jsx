import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/formatCurrency";
import { getDishImagePath } from "../utils/imagePath";
import AddToCartButton from "../cart/AddToCartButton";
import FavoriteButton from "../favorites/FavoriteButton";
import "./DishCard.css";

function DishCard({ dish }) {
  if (!dish) return null;

  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-card-image-link">
        <div className="dish-card-image">
          <img
            src={getDishImagePath(dish.image)}
            alt={dish.name}
            loading="lazy"
          />
          {dish.spicy && <span className="spicy-badge">🌶️</span>}
          <div className="dish-card-favorite">
            <FavoriteButton dish={dish} size="small" />
          </div>
        </div>
      </Link>

      <div className="dish-card-content">
        <Link to={`/menu/${dish.id}`} className="dish-card-name-link">
          <h3 className="dish-card-name">{dish.name}</h3>
        </Link>

        <p className="dish-card-description">
          {dish.description?.slice(0, 60)}
          {dish.description?.length > 60 ? "..." : ""}
        </p>

        <div className="dish-card-footer">
          <span className="dish-card-price">{formatCurrency(dish.price)}</span>
          <AddToCartButton dish={dish} size="small" />
        </div>

        <span className="dish-card-category">{dish.category}</span>
      </div>
    </article>
  );
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    spicy: PropTypes.bool,
    image: PropTypes.string,
  }).isRequired,
};

export default DishCard;
