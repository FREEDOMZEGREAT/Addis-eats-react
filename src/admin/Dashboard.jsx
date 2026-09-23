import { useMemo } from "react";
import { useOrders } from "../orders/orderHistoryStore";
import { fetchDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import { formatCurrency } from "../utils/formatCurrency";
import "./Dashboard.css";

function Dashboard() {
  const orders = useOrders();
  const { data: dishes } = useFetch(fetchDishes);
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const orderCount = orders.length;
    const avgOrder = orderCount > 0 ? totalRevenue / orderCount : 0;
    const totalItems = orders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
      0,
    );

    return {
      totalRevenue,
      orderCount,
      avgOrder,
      totalItems,
      dishCount: dishes?.length || 0,
    };
  }, [orders, dishes]);
  const topDishes = useMemo(() => {
    const counts = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        counts[item.name] = (counts[item.name] || 0) + item.quantity;
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [orders]);
  const statusBreakdown = useMemo(() => {
    const counts = {
      pending: 0,
      preparing: 0,
      delivering: 0,
      delivered: 0,
      cancelled: 0,
    };
    orders.forEach((o) => {
      if (counts[o.status] !== undefined) counts[o.status]++;
    });
    return counts;
  }, [orders]);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening.</p>
      </header>
      <div className="stats-grid">
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
        />
        <StatCard icon="📦" label="Total Orders" value={stats.orderCount} />
        <StatCard
          icon="📊"
          label="Average Order"
          value={formatCurrency(stats.avgOrder)}
        />
        <StatCard icon="🍽️" label="Menu Items" value={stats.dishCount} />
      </div>
      <div className="dashboard-columns">
        <div className="dashboard-card">
          <h2 className="card-title">🏆 Top Selling Dishes</h2>
          {topDishes.length === 0 ? (
            <p className="empty-note">No orders yet</p>
          ) : (
            <div className="top-dishes-list">
              {topDishes.map((dish, idx) => (
                <div key={dish.name} className="top-dish-row">
                  <span className="rank">#{idx + 1}</span>
                  <span className="dish-name">{dish.name}</span>
                  <span className="dish-count">{dish.count} orders</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="dashboard-card">
          <h2 className="card-title">📊 Order Status</h2>
          <div className="status-list">
            <StatusRow
              label="Pending"
              count={statusBreakdown.pending}
              color="#f39c12"
            />
            <StatusRow
              label="Preparing"
              count={statusBreakdown.preparing}
              color="#3498db"
            />
            <StatusRow
              label="Delivering"
              count={statusBreakdown.delivering}
              color="#9b59b6"
            />
            <StatusRow
              label="Delivered"
              count={statusBreakdown.delivered}
              color="#27ae60"
            />
            <StatusRow
              label="Cancelled"
              count={statusBreakdown.cancelled}
              color="#e74c3c"
            />
          </div>
        </div>
      </div>
      <div className="dashboard-card">
        <h2 className="card-title">🕐 Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="empty-note">No orders yet</p>
        ) : (
          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Area</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.orderId}>
                  <td>
                    <code>{order.orderId}</code>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.area}</td>
                  <td>
                    <strong>{formatCurrency(order.total)}</strong>
                  </td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

function StatusRow({ label, count, color }) {
  return (
    <div className="status-row">
      <div className="status-label">
        <span className="status-dot" style={{ background: color }} />
        <span>{label}</span>
      </div>
      <span className="status-count">{count}</span>
    </div>
  );
}

export default Dashboard;
