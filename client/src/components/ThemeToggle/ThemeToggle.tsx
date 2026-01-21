import { useTheme } from "../../services/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Basculer vers le mode ${theme === "light" ? "sombre" : "clair"}`}
      title={`Mode actuel : ${theme === "light" ? "clair" : "sombre"}`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;
