import PropTypes from "prop-types";
import { useCartActions, useCartQuantity } from "./cartStore";
import "./AddToCartButton.css";
function AddToCartButton({ dish, size = "medium", variant = "primary" }) {
  const { addItem, removeItem } = useCartActions();
  const quantity = useCartQuantity(dish.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(dish);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(dish.id);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(dish);
  };
  if (quantity === 0) {
    return (
      <button
        className={`add-to-cart-btn size-${size} variant-${variant}`}
        onClick={handleAdd}
        aria-label={`Add ${dish.name} to cart`}
      >
        🛒 Add
      </button>
    );
  }
  return (
    <div
      className={`quantity-controls size-${size}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        className="qty-btn qty-decrement"
        onClick={handleDecrement}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty-value">{quantity}</span>
      <button
        className="qty-btn qty-increment"
        onClick={handleIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

AddToCartButton.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

export default AddToCartButton;
