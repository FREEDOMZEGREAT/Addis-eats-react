export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "0 ETB";
  if (isNaN(amount)) return "0 ETB";
  return `${Number(amount).toLocaleString("en-us")} ETB`;
}

export default formatCurrency;
