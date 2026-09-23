import { useCartCount } from './cartStore';
import './CartBadge.css';

function CartBadge() {
  const count = useCartCount();
  
  if (count === 0) return null;
  
  return (
    <span className="cart-badge" aria-label={`${count} items in cart`}>
      {count > 10 ? '10+' : count}
    </span>
  );
}

export default CartBadge;