import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAdminDishStore = create(
  persist(
    (set) => ({
      customDishes: [],
      deletedIds: [],
      
      addDish: (dish) => {
        set((state) => ({
          customDishes: [...state.customDishes, dish],
        }));
      },
      
      updateDish: (dish) => {
        set((state) => {
          const exists = state.customDishes.some(d => d.id === dish.id);
          if (exists) {
            return {
              customDishes: state.customDishes.map(d =>
                d.id === dish.id ? dish : d
              ),
            };
          }
          return {
            customDishes: [...state.customDishes, dish],
          };
        });
      },
      
      deleteDish: (id) => {
        set((state) => ({
          deletedIds: [...state.deletedIds, id],
          customDishes: state.customDishes.filter(d => d.id !== id),
        }));
      },
      
      resetChanges: () => {
        set({ customDishes: [], deletedIds: [] });
      },
    }),
    {
      name: 'addis-eats-admin-dishes',
    }
  )
);

export default useAdminDishStore;