// ================================================
// src/favorites/FavoriteButton.jsx
// 🎯 HEART BUTTON FOR TOGGLING FAVORITES
// ================================================

import PropTypes from 'prop-types';
import { useIsFavorite, useFavoriteActions } from './favoritesStore';
import './FavoriteButton.css';

/**
 * 📚 WHY THIS COMPONENT?
 * 
 * Used in:
 * - DishCard (small heart top-right of image)
 * - DishDetail (larger heart near title)
 * 
 * 📚 IMPORTANT: stopPropagation
 * 
 * The DishCard is wrapped in a <Link>.
 * Without stopPropagation, clicking the heart
 * would also navigate to the dish detail!
 */

function FavoriteButton({ dish, size = 'medium', showLabel = false }) {
  const isFav = useIsFavorite(dish.id);
  const { toggleFavorite } = useFavoriteActions();
  
  const handleClick = (e) => {
    // 🎯 CRITICAL: Stop the click from triggering parent Link
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(dish.id);
  };
  
  return (
    <button
      type="button"
      className={`favorite-btn size-${size} ${isFav ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={isFav ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
      aria-pressed={isFav}
    >
      <span className="heart-icon" aria-hidden="true">
        {isFav ? '❤️' : '🤍'}
      </span>
      {showLabel && (
        <span className="favorite-label">
          {isFav ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}

FavoriteButton.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showLabel: PropTypes.bool,
};

export default FavoriteButton;