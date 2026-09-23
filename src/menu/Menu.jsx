import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import DishCard from "./DishCard";
import { useAdminDishStore } from "../admin/adminDishStore";
import mergeDishes from "./mergeDishes";
import "./Menu.css";
function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const selectedCategory = searchParams.get("category") || "All";
  const { data: dishes, loading, error } = useFetch(fetchDishes);
  const { customDishes, deletedIds } = useAdminDishStore();
  const availableDishes = useMemo(
    () =>
      mergeDishes(dishes || [], customDishes, deletedIds).filter(
        (dish) => dish.available !== false,
      ),
    [dishes, customDishes, deletedIds],
  );
  const categories = useMemo(() => {
    if (!availableDishes.length) return ["All"];
    const unique = [...new Set(availableDishes.map((d) => d.category))];
    return ["All", ...unique];
  }, [availableDishes]);
  const filteredDishes = useMemo(() => {
    let result = availableDishes;
    if (selectedCategory !== "All") {
      result = result.filter((dish) => dish.category === selectedCategory);
    }
    if (debouncedSearchTerm.trim()) {
      const term = debouncedSearchTerm.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.description?.toLowerCase().includes(term),
      );
    }
    return result;
  }, [availableDishes, selectedCategory, debouncedSearchTerm]);
  const handleCategoryChange = useCallback(
    (category) => {
      if (category === "All") {
        searchParams.delete("category");
      } else {
        searchParams.set("category", category);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );
  if (loading) {
    if (error) {
      return <div className="menu-page">{error}</div>;
    }

    return (
      <div className="menu-page">
        <header className="menu-header menu-header-skeleton" aria-hidden="true">
          <div className="menu-skeleton menu-skeleton-title" />
          <div className="menu-skeleton menu-skeleton-subtitle" />
        </header>
        <div
          className="menu-skeleton menu-skeleton-search"
          aria-hidden="true"
        />
        <div className="menu-skeleton-categories" aria-hidden="true">
          <div className="menu-skeleton menu-skeleton-chip" />
          <div className="menu-skeleton menu-skeleton-chip" />
          <div className="menu-skeleton menu-skeleton-chip" />
          <div className="menu-skeleton menu-skeleton-chip" />
        </div>
        <div className="dish-grid menu-skeleton-grid" aria-label="Loading menu">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="menu-skeleton-card" key={index}>
              <div className="menu-skeleton menu-skeleton-image" />
              <div className="menu-skeleton-content">
                <div className="menu-skeleton menu-skeleton-name" />
                <div className="menu-skeleton menu-skeleton-description" />
                <div className="menu-skeleton menu-skeleton-description menu-skeleton-description-short" />
                <div className="menu-skeleton menu-skeleton-footer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="menu-page">
      <header className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-subtitle">
          Discover authentic Ethiopian flavors and more
        </p>
      </header>
      <div className="menu-search">
        <span className="search-icon"></span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search dishes..."
          className="search-input"
          aria-label="Search dishes"
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className="menu-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-chip ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="menu-results">
        <span>
          Showing {filteredDishes.length} of {availableDishes.length} dishes
        </span>
      </div>
      {filteredDishes.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon"></span>
          <h3>No dishes found</h3>
          <p>Try a different category or search term</p>
          <button
            onClick={() => {
              setSearchTerm("");
              handleCategoryChange("All");
            }}
            className="reset-btn"
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Menu;
