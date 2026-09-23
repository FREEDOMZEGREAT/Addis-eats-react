import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const destination = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ name: name.trim(), phone: phone.trim() });
    navigate(destination, { replace: true });
  };

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="login-eyebrow">Addis Eats</p>
        <h1>Sign in to continue</h1>
        <p className="login-copy">
          Use your delivery details to continue to checkout.
        </p>
        <label htmlFor="login-name">Full name</label>
        <input
          id="login-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="name"
        />
        <label htmlFor="login-phone">Phone number</label>
        <input
          id="login-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          autoComplete="tel"
        />
        <button type="submit">Continue to checkout</button>
        <Link to="/menu" className="login-back">
          Back to menu
        </Link>
      </form>
    </main>
  );
}

export default Login;
