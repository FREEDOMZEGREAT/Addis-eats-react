import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useOrderHistoryStore = create(
  persist(
    (set, get) => ({
      orders: [],
      get count() {
        return get().orders.length;
      },

      get totalSpent() {
        return get().orders.reduce((sum, o) => sum + o.total, 0);
      },
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
      removeOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.orderId !== orderId),
        }));
      },
      clearHistory: () => {
        set({ orders: [] });
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.orderId === orderId ? { ...order, status } : order,
          ),
        }));
      },

      refreshOrders: () => {
        useOrderHistoryStore.persist?.rehydrate();
      },
      getOrder: (orderId) => {
        return get().orders.find((o) => o.orderId === orderId);
      },
    }),
    {
      name: "addis-eats-order-history",
      version: 1,
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== "addis-eats-order-history" || !event.newValue) return;

    try {
      const persistedState = JSON.parse(event.newValue);
      if (Array.isArray(persistedState.state?.orders)) {
        useOrderHistoryStore.setState({ orders: persistedState.state.orders });
      }
    } catch {
      // Ignore invalid cross-tab storage data.
    }
  });
}
export const useOrders = () => useOrderHistoryStore((state) => state.orders);

export const useOrderCount = () => useOrderHistoryStore((state) => state.count);

export const useOrderActions = () => ({
  addOrder: useOrderHistoryStore((state) => state.addOrder),
  removeOrder: useOrderHistoryStore((state) => state.removeOrder),
  clearHistory: useOrderHistoryStore((state) => state.clearHistory),
  updateOrderStatus: useOrderHistoryStore((state) => state.updateOrderStatus),
  refreshOrders: useOrderHistoryStore((state) => state.refreshOrders),
});

export default useOrderHistoryStore;
