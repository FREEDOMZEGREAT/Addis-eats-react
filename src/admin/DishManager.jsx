import { useState } from "react";
import { fetchDishes } from "../api/dishes";
import useFetch from "../hooks/useFetch";
import { useAdminDishStore } from "./adminDishStore";
import { formatCurrency } from "../utils/formatCurrency";
import { getDishImagePath } from "../utils/imagePath";
import Spinner from "../ui/Spinner";
import mergeDishes from "../menu/mergeDishes";
import "./DishManager.css";

function DishManager() {
  const [search, setSearch] = useState("");
  const [editingDish, setEditingDish] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { data: apiDishes, loading, error } = useFetch(fetchDishes);
  const { customDishes, deletedIds, addDish, updateDish, deleteDish } =
    useAdminDishStore();
  const allDishes = mergeDishes(apiDishes || [], customDishes, deletedIds);
  const displayedDishes = allDishes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this dish?")) {
      deleteDish(id);
    }
  };

  const handleToggleAvailability = (dish) => {
    updateDish({ ...dish, available: dish.available !== false ? false : true });
  };

  const handleSave = (dishData) => {
    if (editingDish) {
      updateDish(dishData);
    } else {
      addDish(dishData);
    }
    setShowForm(false);
    setEditingDish(null);
  };

  if (loading) return <Spinner message="Loading dishes..." />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dish-manager">
      <header className="manager-header">
        <div>
          <h1>Menu Management</h1>
          <p>{allDishes.length} dishes total</p>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            setEditingDish(null);
            setShowForm(true);
          }}
        >
          ➕ Add New Dish
        </button>
      </header>
      <div className="manager-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {showForm && (
        <DishForm
          dish={editingDish}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingDish(null);
          }}
        />
      )}
      <div className="dishes-table-container">
        <table className="dishes-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDishes.map((dish) => (
              <tr key={dish.id}>
                <td>
                  <img
                    src={getDishImagePath(dish.image)}
                    alt={dish.name}
                    className="table-image"
                    onError={(event) => {
                      event.currentTarget.src = "/images/hero.jpg";
                    }}
                  />
                </td>
                <td>
                  <strong>{dish.name}</strong>
                  <p className="table-description">{dish.description}</p>
                </td>
                <td>
                  <span className="table-category">{dish.category}</span>
                </td>
                <td>
                  <strong>{formatCurrency(dish.price)}</strong>
                </td>
                <td>
                  <button
                    className={`availability-btn ${dish.available === false ? "unavailable" : "available"}`}
                    onClick={() => handleToggleAvailability(dish)}
                    aria-pressed={dish.available !== false}
                  >
                    {dish.available === false ? "Unavailable" : "Available"}
                  </button>
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingDish(dish);
                        setShowForm(true);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(dish.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {displayedDishes.length === 0 && (
          <p className="no-results">No dishes match your search</p>
        )}
      </div>
    </div>
  );
}
function DishForm({ dish, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: dish?.id || "",
    name: dish?.name || "",
    price: dish?.price || 0,
    category: dish?.category || "Ethiopian",
    description: dish?.description || "",
    spicy: dish?.spicy || false,
    image: dish?.image || "",
    available: dish?.available !== false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Name and price are required");
      return;
    }
    onSave({ ...form, id: form.id || Date.now() });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <h2>{dish ? "Edit Dish" : "Add New Dish"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <label>Price (ETB) *</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="form-row">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Ethiopian</option>
              <option>Pizza</option>
              <option>Burgers</option>
              <option>Drinks</option>
            </select>
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="form-row">
            <label htmlFor="dish-image">Image path or URL</label>
            <input
              id="dish-image"
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/doro-wot.jpg"
            />
            <small>Paste a public path, or choose an image file below.</small>
          </div>

          <div className="form-row">
            <label htmlFor="dish-image-file">Choose image from computer</label>
            <input
              id="dish-image-file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () =>
                  setForm((current) => ({ ...current, image: reader.result }));
                reader.readAsDataURL(file);
              }}
            />
          </div>

          <div className="form-row checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={form.spicy}
                onChange={(e) => setForm({ ...form, spicy: e.target.checked })}
              />
              Spicy 🌶️
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {dish ? "Save Changes" : "Add Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DishManager;
