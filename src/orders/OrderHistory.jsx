import { Link } from "react-router-dom";
import { useOrders, useOrderCount } from "./orderHistoryStore";
import OrderHistoryItem from "./OrderHistoryItem";
import "./OrderHistory.css";

function OrderHistory() {
  const orders = useOrders();
  const count = useOrderCount();

  const storedOrders = (() => {
    try {
      const saved = localStorage.getItem("addis-eats-order-history");
      return saved ? JSON.parse(saved).state?.orders || [] : [];
    } catch {
      return [];
    }
  })();
  const visibleOrders = orders.length > 0 ? orders : storedOrders;
  const visibleOrderCount = visibleOrders.length;
  if (count === 0 && visibleOrders.length === 0) {
    return (
      <div className="history-page">
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <h2 className="empty-title">No orders yet</h2>
          <p className="empty-message">
            Your past orders will appear here. Start by ordering something
            delicious!
          </p>
          <Link to="/menu" className="empty-btn">
            🍛 Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <header className="history-header">
        <div>
          <h1 className="history-title">Order History</h1>
          <p className="history-subtitle">
            {visibleOrderCount} {visibleOrderCount === 1 ? "order" : "orders"}
          </p>
        </div>
      </header>

      <div className="orders-list">
        {visibleOrders.map((order) => (
          <OrderHistoryItem key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
