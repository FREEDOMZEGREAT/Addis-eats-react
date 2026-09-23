import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import ThemeContext from "./ThemeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("addis-eats-theme");
    return saved || "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("addis-eats-theme", theme);
  }, [theme]);
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);
  const setSpecificTheme = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme: setSpecificTheme,
      isDark: theme === "dark",
    }),
    [theme, toggleTheme, setSpecificTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
