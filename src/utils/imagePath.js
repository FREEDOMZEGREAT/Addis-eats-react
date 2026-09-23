export function getDishImagePath(image) {
  if (!image) return "/images/hero.jpg";
  if (image.startsWith("data:") || image.startsWith("http")) return image;

  const normalizedImage = image.replace(/^\/?images\//, "");
  return `/images/${encodeURIComponent(normalizedImage)}`;
}

export default getDishImagePath;
