import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCartActions } from "../cart/cartStore";
import { formatCurrency } from "../utils/formatCurrency";
import "./OrderHistoryItem.css";

const STATUS_LABELS = {
  pending: { label: "Pending", color: "#f39c12", icon: "⏳" },
  preparing: { label: "Preparing", color: "#3498db", icon: "👨‍🍳" },
  delivering: { label: "Delivering", color: "#9b59b6", icon: "🚴" },
  delivered: { label: "Delivered", color: "#27ae60", icon: "✅" },
  cancelled: { label: "Cancelled", color: "#e74c3c", icon: "✕" },
};

function OrderHistoryItem({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCartActions();

  const status = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
  const orderDate = new Date(order.timestamp);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = orderDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const handleReorder = () => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addItem(item);
      }
    });
    navigate("/cart");
  };
  return (
    <div className="order-item-card">
      <div className="order-header">
        <div className="order-header-left">
          <span className="order-id">{order.orderId}</span>
          <span className="order-date">
            {formattedDate} · {formattedTime}
          </span>
        </div>
        <span
          className="order-status"
          style={{ background: status.color + "20", color: status.color }}
        >
          {status.icon} {status.label}
        </span>
      </div>
      <div className="order-summary-row">
        <div className="order-summary-col">
          <span className="summary-label">Items</span>
          <span className="summary-value">
            {order.items.reduce((s, i) => s + i.quantity, 0)}
          </span>
        </div>
        <div className="order-summary-col">
          <span className="summary-label">Total</span>
          <span className="summary-value highlight">
            {formatCurrency(order.total)}
          </span>
        </div>
        <div className="order-summary-col">
          <span className="summary-label">Delivery</span>
          <span className="summary-value">{order.area}</span>
        </div>
      </div>
      <button
        className="toggle-details-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "▲ Hide Items" : "▼ Show Items"}
      </button>
      {isExpanded && (
        <div className="order-items-list">
          {order.items.map((item) => (
            <div key={item.id} className="order-item-row">
              <span className="item-name">
                {item.name} × {item.quantity}
              </span>
              <span className="item-price">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="order-actions">
        <button className="action-btn reorder" onClick={handleReorder}>
          🔄 Reorder
        </button>
      </div>
    </div>
  );
}

OrderHistoryItem.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    name: PropTypes.string,
    phone: PropTypes.string,
    area: PropTypes.string,
    status: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderHistoryItem;
