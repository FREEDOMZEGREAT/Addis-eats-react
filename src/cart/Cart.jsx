import { Link, useNavigate } from "react-router-dom";
import { useCartItems, useCartTotal, useCartCount, useCartActions,} from "./cartStore";
import { formatCurrency } from "../utils/formatCurrency";
import { getDishImagePath } from "../utils/imagePath";
import "./Cart.css";
function Cart() {
  const items = useCartItems();
  const total = useCartTotal();
  const itemCount = useCartCount();
  const { removeItem, updateQuantity, clearCart } = useCartActions();

  const navigate = useNavigate();
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="empty-icon">🛒</span>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-message">
            Looks like you haven't added any dishes yet.
          </p>
          <Link to="/menu" className="empty-btn">
            🍛 Browse Menu
          </Link>
        </div>
      </div>
    );
  }
  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      if (window.confirm(`Remove ${item.name} from cart?`)) {
        removeItem(item.id);
      }
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = (item) => {
    if (window.confirm(`Remove ${item.name} from cart?`)) {
      removeItem(item.id);
    }
  };

  const handleClear = () => {
    if (window.confirm("Clear entire cart?")) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <h1 className="cart-title">🛒 Your Cart</h1>
          <p className="cart-subtitle">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <button className="clear-cart-btn" onClick={handleClear}>
          Clear All
        </button>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/menu/${item.id}`} className="cart-item-image">
                <img src={getDishImagePath(item.image)} alt={item.name} />
              </Link>
              <div className="cart-item-info">
                <Link to={`/menu/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-category">{item.category}</span>
                <span className="cart-item-price">
                  {formatCurrency(item.price)} each
                </span>
              </div>
              <div className="cart-item-quantity">
                <button
                  className="qty-btn"
                  onClick={() => handleDecrement(item)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => handleIncrement(item)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="cart-item-subtotal">
                {formatCurrency(item.price * item.quantity)}
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <aside className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-text">FREE</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span className="total-amount">{formatCurrency(total)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>

          <Link to="/menu" className="continue-link">
            ← Continue Shopping
          </Link>

          <div className="summary-note">
            <p>🔒 Secure TeleBirr payment</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
