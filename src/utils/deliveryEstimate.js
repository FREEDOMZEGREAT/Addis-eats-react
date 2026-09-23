const DELIVERY_TIMES = {
  Bole: "25-35 minutes",
  CMC: "35-45 minutes",
  Kazanchis: "25-35 minutes",
  Piassa: "30-40 minutes",
  Megenagna: "35-45 minutes",
  Mexico: "25-35 minutes",
  "Sar Bet": "35-45 minutes",
  Gerji: "40-50 minutes",
};

export function getDeliveryEstimate(area) {
  return DELIVERY_TIMES[area] || "30-45 minutes";
}

export default getDeliveryEstimate;
