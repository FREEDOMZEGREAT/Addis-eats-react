const PHONE_PATTERNS = [
  /^9[0-9]{8}$/,
  /^09[0-9]{8}$/,
  /^\+2519[0-9]{8}$/,
  /^2519[0-9]{8}$/,
];
export function validate(formData) {
  const errors = {};
  const name = formData.name?.trim() || "";
  if (!name) {
    errors.name = "Please enter your full name";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }
  const phone = formData.phone?.trim() || "";
  if (!phone) {
    errors.phone = "Please enter your TeleBirr number";
  } else {
    const cleanPhone = phone.replace(/\s/g, "");
    const isValid = PHONE_PATTERNS.some((p) => p.test(cleanPhone));

    if (!isValid) {
      errors.phone = "Enter a valid TeleBirr number (e.g., 9XXXXXXXX)";
    }
  }
  const area = formData.area?.trim() || "";
  if (!area) {
    errors.area = "Please select a delivery area";
  }
  const notes = formData.notes?.trim() || "";
  if (notes.length > 200) {
    errors.notes = "Notes must be less than 200 characters";
  }

  if (!formData.transactionId?.trim() && !formData.receipt) {
    errors.paymentProof = "Enter a transaction ID or upload a receipt";
  }

  return errors;
}
export function getFirstErrorField(errors) {
  const keys = Object.keys(errors);
  return keys.length > 0 ? keys[0] : null;
}
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}

export default validate;
