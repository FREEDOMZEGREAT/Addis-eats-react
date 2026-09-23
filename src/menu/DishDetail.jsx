import { Link, useParams } from "react-router-dom";
import { useCallback } from "react";
import { fetchDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import formatCurrency from "../utils/formatCurrency";
import { getDishImagePath } from "../utils/imagePath";
import { useAdminDishStore } from "../admin/adminDishStore";
import mergeDishes from "./mergeDishes";
import AddToCartButton from "../cart/AddToCartButton";
import "./DishDetail.css";

function DishDetail() {
  const { id } = useParams();
  const loadDish = useCallback(() => fetchDishes(), []);
  const { data: dishes, loading, error } = useFetch(loadDish);
  const { customDishes, deletedIds } = useAdminDishStore();
  const mergedDish = mergeDishes(dishes || [], customDishes, deletedIds).find(
    (item) => item.id === Number(id) && item.available !== false,
  );

  if (loading) return <div className="dish-detail-state">Loading dish...</div>;
  if (error || !mergedDish) {
    return (
      <div className="dish-detail-state">
        <h1>Dish not found</h1>
        <Link to="/menu" className="detail-back-button">
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <article className="dish-detail">
      <img
        src={getDishImagePath(mergedDish.image)}
        alt={mergedDish.name}
        className="dish-detail-image"
      />
      <div className="dish-detail-content">
        <Link to="/menu" className="detail-back-link">
          ← Back to menu
        </Link>
        <p className="dish-detail-category">{mergedDish.category}</p>
        <h1>{mergedDish.name}</h1>
        <p className="dish-detail-description">{mergedDish.description}</p>
        <strong className="dish-detail-price">
          {formatCurrency(mergedDish.price)}
        </strong>
        <div className="dish-detail-actions">
          <AddToCartButton dish={mergedDish} size="large" variant="primary" />
        </div>
      </div>
    </article>
  );
}

export default DishDetail;
