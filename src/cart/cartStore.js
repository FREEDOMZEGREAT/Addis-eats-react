import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },
      get itemCount() {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      get isEmpty() {
        return get().items.length === 0;
      },
      addItem: (dish) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === dish.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...dish, quantity: 1 }],
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          if (item.quantity === 1) {
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            ),
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i,
            ),
          };
        });
      },
      clearCart: () => set({ items: [] }),
      isInCart: (id) => {
        return get().items.some((i) => i.id === id);
      },
      getQuantity: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "addis-eats-cart",
      version: 1,
    },
  ),
);
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    ),
  );
export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce((count, item) => count + Number(item.quantity || 0), 0),
  );
export const useCartActions = () => ({
  addItem: useCartStore((state) => state.addItem),
  removeItem: useCartStore((state) => state.removeItem),
  updateQuantity: useCartStore((state) => state.updateQuantity),
  clearCart: useCartStore((state) => state.clearCart),
});
export const useIsInCart = (id) => useCartStore((state) => state.isInCart(id));
export const useCartQuantity = (id) =>
  useCartStore((state) => state.getQuantity(id));

export default useCartStore;
