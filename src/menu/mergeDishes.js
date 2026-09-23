export function mergeDishes(
  apiDishes = [],
  customDishes = [],
  deletedIds = [],
) {
  const visibleDishes = apiDishes
    .filter((dish) => !deletedIds.includes(dish.id))
    .map((dish) => {
      const edit = customDishes.find((customDish) => customDish.id === dish.id);
      return edit ? { ...dish, ...edit } : dish;
    });

  const newDishes = customDishes.filter(
    (dish) =>
      !deletedIds.includes(dish.id) &&
      !apiDishes.some((apiDish) => apiDish.id === dish.id),
  );

  return [...visibleDishes, ...newDishes];
}

export default mergeDishes;
