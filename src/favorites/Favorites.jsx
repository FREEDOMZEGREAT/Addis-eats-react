import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchDishes } from '../api/dishes';
import useFetch from '../hooks/useFetch';
import { useFavoriteIds, useFavoriteActions } from './favoritesStore';
import DishCard from '../menu/DishCard';
import Spinner from '../ui/Spinner';
import './Favorites.css';
function Favorites() {
  const favoriteIds = useFavoriteIds();
  const { clearFavorites } = useFavoriteActions();
  const { data: dishes, loading, error, refetch } = useFetch(fetchDishes);
  const favoriteDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter(d => favoriteIds.includes(d.id));
  }, [dishes, favoriteIds]);
  if (loading) {
    return (
      <div className="favorites-page">
        <Spinner message="Loading your favorites..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="favorites-page">
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <h2>Couldn't load favorites</h2>
          <p>{error}</p>
          <button onClick={refetch} className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }
  if (favoriteIds.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-state">
          <span className="empty-icon">🤍</span>
          <h2 className="empty-title">No favorites yet</h2>
          <p className="empty-message">
            Tap the heart on any dish to save it here for quick access.
          </p>
          <Link to="/menu" className="empty-btn">
            🍛 Browse Menu
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <div>
          <h1 className="favorites-title">❤️ Your Favorites</h1>
          <p className="favorites-subtitle">
            {favoriteDishes.length} {favoriteDishes.length === 1 ? 'dish' : 'dishes'} saved
          </p>
        </div>
        <button 
          className="clear-btn"
          onClick={() => {
            if (window.confirm('Remove all favorites?')) {
              clearFavorites();
            }
          }}
        >
          Clear All
        </button>
      </header>
      
      <div className="dish-grid">
        {favoriteDishes.map(dish => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;