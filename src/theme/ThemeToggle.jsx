import { useTheme } from "./useTheme";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="theme-icon">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
}

export default ThemeToggle;
