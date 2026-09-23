import { useEffect, useState } from "react";
import { useOrders, useOrderActions } from "../orders/orderHistoryStore";
import { formatCurrency } from "../utils/formatCurrency";
import "./OrderManager.css";

const STATUS_OPTIONS = [
  "pending",
  "preparing",
  "delivering",
  "delivered",
  "cancelled",
];

function OrderManager() {
  const orders = useOrders();
  const { updateOrderStatus, removeOrder, refreshOrders } = useOrderActions();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "all" || order.status === filter;
    const matchesSearch =
      !normalizedSearch ||
      [order.orderId, order.name, order.phone, order.area].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(normalizedSearch),
      );
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (orderId) => {
    if (window.confirm("Delete this order permanently?")) {
      removeOrder(orderId);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="order-manager">
      <header className="manager-header">
        <div>
          <h1>Order Management</h1>
          <p>{orders.length} orders total</p>
        </div>
        <button className="add-btn" type="button" onClick={refreshOrders}>
          Refresh Orders
        </button>
      </header>

      <div className="manager-search">
        <span>🔍</span>
        <input
          type="search"
          placeholder="Search by order ID, customer, phone, or area"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({orders.length})
        </button>
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            className={`filter-tab ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status} ({orders.filter((o) => o.status === status).length})
          </button>
        ))}
      </div>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Area</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId}>
                <td>
                  <code>{order.orderId}</code>
                </td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.area}</td>
                <td>{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                <td>
                  <strong>{formatCurrency(order.total)}</strong>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, e.target.value)
                    }
                    className={`status-select status-${order.status}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order.orderId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <p className="no-results">No orders found</p>
        )}
      </div>
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-detail" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>
            <p>
              <strong>ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Area:</strong> {selectedOrder.area}
            </p>
            <p>
              <strong>Amount Paid:</strong>{" "}
              {formatCurrency(
                selectedOrder.paymentAmount || selectedOrder.total,
              )}
            </p>
            <p>
              <strong>TeleBirr Proof:</strong>{" "}
              {selectedOrder.transactionId ||
                selectedOrder.receiptName ||
                "Not provided"}
            </p>
            {selectedOrder.notes && (
              <p>
                <strong>Notes:</strong> {selectedOrder.notes}
              </p>
            )}

            <h3>Items</h3>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity} ={" "}
                  {formatCurrency(item.price * item.quantity)}
                </li>
              ))}
            </ul>

            <p className="modal-total">
              <strong>Total:</strong> {formatCurrency(selectedOrder.total)}
            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManager;
