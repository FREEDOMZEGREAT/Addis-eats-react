import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import Field from "../checkout/Field";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const credentials = useAdminAuth((state) => state.credentials);
  const setupAdmin = useAdminAuth((state) => state.setupAdmin);
  const login = useAdminAuth((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";
  const isSetup = !credentials;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true, confirmPassword: true });

    if (!username || !password || (isSetup && !confirmPassword)) {
      setError("Please enter both username and password");
      return;
    }

    if (isSetup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (isSetup && password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const result = isSetup
      ? setupAdmin(username.trim(), password)
      : login(username.trim(), password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <span className="admin-icon">🔐</span>
          <h1>{isSetup ? "Create Admin Account" : "Admin Login"}</h1>
          <p>
            {isSetup
              ? "Set the credentials for this admin panel"
              : "Addis Eats Management Console"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <Field
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
            error={!username && touched.username ? "Username required" : ""}
            touched={touched.username}
            required
            placeholder={isSetup ? "Choose a username" : "Enter your username"}
          />

          <Field
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            error={!password && touched.password ? "Password required" : ""}
            touched={touched.password}
            required
            placeholder="Enter password"
          />

          {isSetup && (
            <Field
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
              error={
                !confirmPassword && touched.confirmPassword
                  ? "Please confirm your password"
                  : ""
              }
              touched={touched.confirmPassword}
              required
              placeholder="Re-enter your password"
            />
          )}

          {error && (
            <div className="login-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="login-submit-btn">
            {isSetup ? "Save Admin Account" : "Sign In"} →
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
