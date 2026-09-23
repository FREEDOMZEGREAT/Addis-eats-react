import { useLocation, Link, Navigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import "./OrderConfirmation.css";
function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✅</div>
        <h1 className="confirmation-title">Order Confirmed!</h1>
        <p className="confirmation-subtitle">
          Thank you, {order.name}! Your order has been received.
        </p>
        <div className="order-number">
          <span className="label">Order Number:</span>
          <strong className="value">{order.orderId}</strong>
        </div>
        <div className="info-section">
          <h2 className="info-title">📦 Delivery Details</h2>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{order.name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">+251 {order.phone}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Area</span>
              <span className="info-value">{order.area}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Estimated Delivery</span>
              <span className="info-value highlight">
                {order.estimatedDelivery}
              </span>
            </div>
          </div>

          {order.notes && (
            <div className="info-item full">
              <span className="info-label">Special Instructions</span>
              <span className="info-value">{order.notes}</span>
            </div>
          )}
        </div>
        <div className="info-section">
          <h2 className="info-title">🍛 Your Order</h2>
          <div className="items-list">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <span className="item-name">
                  {item.name} × {item.quantity}
                </span>
                <span className="item-price">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total Paid</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </div>
        <div className="confirmation-actions">
          <Link to="/menu" className="action-btn primary">
            Order More
          </Link>
          <Link to="/" className="action-btn secondary">
            Back to Home
          </Link>
          <Link to="/orders" className="action-btn secondary">
            View Order History
          </Link>
        </div>

        <p className="confirmation-note">
          We'll send you a confirmation call shortly. You can track your order
          status in the app.
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
