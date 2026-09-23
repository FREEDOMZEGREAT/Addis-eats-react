
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favoriteIds: [],
      get count() {
        return get().favoriteIds.length;
      },
      toggleFavorite: (id) => {
        set((state) => {
          const isFav = state.favoriteIds.includes(id);
          
          if (isFav) {
            return {
              favoriteIds: state.favoriteIds.filter(fId => fId !== id),
            };
          }
          
          return {
            favoriteIds: [...state.favoriteIds, id],
          };
        });
      },
      isFavorite: (id) => {
        return get().favoriteIds.includes(id);
      },
      clearFavorites: () => {
        set({ favoriteIds: [] });
      },
    }),
    {
      name: 'addis-eats-favorites',
      version: 1,
    }
  )
);
export const useFavoriteIds = () => 
  useFavoritesStore(state => state.favoriteIds);

export const useFavoriteCount = () => 
  useFavoritesStore(state => state.count);

export const useIsFavorite = (id) => 
  useFavoritesStore(state => state.isFavorite(id));

export const useFavoriteActions = () => ({
  toggleFavorite: useFavoritesStore(state => state.toggleFavorite),
  clearFavorites: useFavoritesStore(state => state.clearFavorites),
});

export default useFavoritesStore;