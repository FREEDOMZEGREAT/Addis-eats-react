export async function placeOrder(orderData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const errors = {};

  const phone = orderData.phone?.trim() || "";
  if (!phone) {
    errors.phone = "Phone number is required";
  } else {
    if (phone.replace(/\s/g, "") === "999999999") {
      errors.phone = "This number is not registered with TeleBirr";
    }
  }

  if (!orderData.area) {
    errors.area = "Delivery area is required";
  }

  if (!orderData.items || orderData.items.length === 0) {
    errors.items = "Cannot place an empty order";
  }
  if (!orderData.transactionId?.trim() && !orderData.receipt) {
    errors.paymentProof = "Transaction ID or receipt is required";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      status: 422,
      errors,
      message: "Please fix the errors and try again",
    };
  }
  return {
    success: true,
    status: 200,
    data: {
      orderId: `ORD-${Date.now()}`,
      items: orderData.items,
      total: orderData.total,
      name: orderData.name,
      phone: orderData.phone,
      area: orderData.area,
      notes: orderData.notes,
      paymentAmount: Number(orderData.total),
      transactionId: orderData.transactionId?.trim() || "",
      receiptName: orderData.receipt?.name || "",
      status: "pending",
      estimatedDelivery: "30-45 minutes",
      timestamp: new Date().toISOString(),
    },
  };
}

export default placeOrder;
