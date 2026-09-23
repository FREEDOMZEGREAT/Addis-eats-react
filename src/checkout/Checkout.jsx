import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartItems, useCartTotal, useCartActions } from "../cart/cartStore";
import { useAuth } from "../auth/useAuth";
import { validate, getFirstErrorField, isFormValid } from "./validate";
import { placeOrder } from "./api";
import { useOrderActions } from "../orders/orderHistoryStore";
import { formatCurrency } from "../utils/formatCurrency";
import Field from "./Field";
import Spinner from "../ui/Spinner";
import DeliveryEstimate from "./DeliveryEstimate";
import "./Checkout.css";
function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = useCartItems();
  const total = useCartTotal();
  const { addOrder } = useOrderActions();
  const { clearCart } = useCartActions();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    area: "",
    notes: "",
    transactionId: "",
    receipt: null,
  });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const validationErrors = validate(form);
  const allErrors = { ...validationErrors, ...serverErrors };
  const formIsValid = isFormValid(allErrors);
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    const nextValue = type === "file" ? files?.[0] || null : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
    if (serverErrors[name]) {
      setServerErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(form).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    const errors = validate(form);
    if (!isFormValid(errors)) {
      const firstField = getFirstErrorField(errors);
      if (firstField) {
        document.getElementById(firstField)?.focus();
      }
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setServerErrors({});

    try {
      const result = await placeOrder({
        ...form,
        items,
        total,
      });

      if (result.success) {
        addOrder(result.data);
        clearCart();
        navigate("/order-confirmation", {
          state: { order: result.data },
          replace: true,
        });
        return;
      } else if (result.status === 422) {
        setServerErrors(result.errors);
        const firstField = getFirstErrorField(result.errors);
        if (firstField) {
          document.getElementById(firstField)?.focus();
        }
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitting) {
    return (
      <div
        className="checkout-page checkout-loading"
        aria-busy="true"
        aria-label="Submitting order"
      >
        <div className="skeleton skeleton-title" />
        <div className="checkout-layout">
          <div className="checkout-form skeleton-panel">
            <div className="skeleton skeleton-heading" />
            <div className="skeleton skeleton-field" />
            <div className="skeleton skeleton-field" />
            <div className="skeleton skeleton-field" />
            <div className="skeleton skeleton-field skeleton-field-short" />
            <div className="skeleton skeleton-button" />
          </div>
          <aside className="order-summary skeleton-panel">
            <div className="skeleton skeleton-heading" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-total" />
          </aside>
        </div>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <span className="empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add some dishes before checking out</p>
        <Link to="/menu" className="empty-btn">
          Browse Menu →
        </Link>
      </div>
    );
  }
  return (
    <div className="checkout-page">
      <h1 className="checkout-title">📦 Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2 className="form-title">Delivery Information</h2>
          <Field
            id="name"
            label="Full Name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={allErrors.name}
            touched={touched.name}
            placeholder="Enter your full name"
            maxLength={50}
            required
            disabled={isSubmitting}
          />
          <div className="payment-section">
            <h2 className="form-title">TeleBirr Payment</h2>
            <p className="payment-help">
              Pay the exact total, then provide a transaction ID or receipt.
            </p>
            <Field
              id="transactionId"
              label="TeleBirr Transaction ID"
              type="text"
              value={form.transactionId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={allErrors.paymentProof}
              touched={touched.transactionId || touched.receipt}
              placeholder="Enter the transaction reference"
              maxLength={80}
              disabled={isSubmitting}
            />
            <div className="receipt-upload">
              <label htmlFor="receipt">Or upload payment receipt</label>
              <input
                id="receipt"
                name="receipt"
                type="file"
                accept="image/*,.pdf"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-describedby={
                  allErrors.paymentProof ? "paymentProof-error" : undefined
                }
              />
              {form.receipt && <span>{form.receipt.name}</span>}
              {allErrors.paymentProof &&
                (touched.receipt || touched.transactionId) && (
                  <p
                    id="paymentProof-error"
                    className="field-error"
                    role="alert"
                  >
                    ⚠️ {allErrors.paymentProof}
                  </p>
                )}
            </div>
          </div>
          <Field
            id="phone"
            label="TeleBirr Number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={allErrors.phone}
            touched={touched.phone}
            placeholder="9XXXXXXXX"
            maxLength={13}
            required
            disabled={isSubmitting}
          />
          <Field
            id="area"
            label="Delivery Area"
            type="select"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            error={allErrors.area}
            touched={touched.area}
            required
            disabled={isSubmitting}
            options={[
              { value: "Bole", label: "Bole" },
              { value: "CMC", label: "CMC" },
              { value: "Kazanchis", label: "Kazanchis" },
              { value: "Piassa", label: "Piassa" },
              { value: "Megenagna", label: "Megenagna" },
              { value: "Mexico", label: "Mexico" },
              { value: "Sar Bet", label: "Sar Bet" },
              { value: "Gerji", label: "Gerji" },
            ]}
          />
          <DeliveryEstimate area={form.area} />
          <Field
            id="notes"
            label="Special Instructions"
            type="textarea"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={allErrors.notes}
            touched={touched.notes}
            placeholder="Any special requests?"
            maxLength={200}
            rows={3}
            disabled={isSubmitting}
          />
          {submitError && (
            <div className="submit-error" role="alert">
              <span className="error-icon">⚠️</span>
              <div>
                <strong>Order failed</strong>
                <p>{submitError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitError(null)}
                className="dismiss-btn"
              >
                ✕
              </button>
            </div>
          )}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner size="small" message="" />
                Sending your order...
              </>
            ) : (
              `Place Order - ${formatCurrency(total)}`
            )}
          </button>

          {!formIsValid && Object.keys(touched).length > 0 && (
            <p className="form-hint">Please fix the errors above to continue</p>
          )}
        </form>
        <aside className="order-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-items">
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <span className="item-name">
                  {item.name} × {item.quantity}
                </span>
                <span className="item-price">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-text">FREE</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row total-row">
            <span>Total</span>
            <span className="total-amount">{formatCurrency(total)}</span>
          </div>

          <div className="summary-notes">
            <p>🔒 Secure TeleBirr payment</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
