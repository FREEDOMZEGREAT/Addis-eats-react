import { useState } from "react";
import Field from "../checkout/Field";
import "./Contact.css";

const CONTACT_EMAIL = "netsanetdegu387@gmail.com";
const CONTACT_PHONE = "+251918072093";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  const errors = {
    name: !form.name.trim() ? "Please enter your full name" : "",
    phone: !form.phone.trim() ? "Please enter your phone number" : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email)
      ? "Please enter a valid email address"
      : "",
    address: !form.address.trim() ? "Please enter your address" : "",
    message: !form.message.trim() ? "Please enter your message" : "",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const allTouched = Object.keys(form).reduce(
      (fields, field) => ({ ...fields, [field]: true }),
      {},
    );
    setTouched(allTouched);

    if (Object.values(errors).some(Boolean)) return;

    const subject = `Addis Eats contact from ${form.name}`;
    const body = [
      `Full name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Address: ${form.address}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="contact-page">
      <section className="contact-intro">
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>We are here to help.</h1>
        <p>
          Have a question about your order, delivery, or menu? Send us a message
          and our team will get back to you.
        </p>
        <div className="contact-details">
          <a href={`mailto:${CONTACT_EMAIL}`}>✉ {CONTACT_EMAIL}</a>
          <a href={`tel:${CONTACT_PHONE}`}>☎ +251 918 072 093</a>
        </div>
      </section>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form-grid">
          <Field
            id="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => setTouched((current) => ({ ...current, name: true }))}
            error={errors.name}
            touched={touched.name}
            placeholder="Enter your full name"
            required
          />
          <Field
            id="phone"
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={() =>
              setTouched((current) => ({ ...current, phone: true }))
            }
            error={errors.phone}
            touched={touched.phone}
            placeholder="09XXXXXXXX"
            required
          />
          <Field
            id="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={() =>
              setTouched((current) => ({ ...current, email: true }))
            }
            error={errors.email}
            touched={touched.email}
            placeholder="you@example.com"
            required
          />
          <Field
            id="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            onBlur={() =>
              setTouched((current) => ({ ...current, address: true }))
            }
            error={errors.address}
            touched={touched.address}
            placeholder="Your delivery or contact address"
            required
          />
        </div>
        <Field
          id="message"
          label="Message"
          type="textarea"
          value={form.message}
          onChange={handleChange}
          onBlur={() =>
            setTouched((current) => ({ ...current, message: true }))
          }
          error={errors.message}
          touched={touched.message}
          placeholder="How can we help?"
          maxLength={500}
          rows={5}
          required
        />
        <button type="submit" className="contact-submit">
          Send Message
        </button>
        {sent && (
          <p className="contact-sent" role="status">
            Your email app is opening with the message addressed to us.
          </p>
        )}
      </form>
    </div>
  );
}

export default Contact;
