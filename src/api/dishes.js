export async function fetchDishes() {
  const response = await fetch("/menu-data.json");
  if (!response.ok) {
    throw new Error("Failed to fetch menu data");
  }

  const data = await response.json();
  if (!Array.isArray(data.dishes)) {
    throw new Error("Invalid menu data format");
  }

  return data.dishes;
}

export async function fetchDishById(id) {
  const dishes = await fetchDishes();
  const dish = dishes.find((item) => item.id === Number(id));
  if (!dish) {
    throw new Error(`Dish with ID ${id} not found`);
  }

  return dish;
}
