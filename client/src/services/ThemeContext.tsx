import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Vérifier la préférence sauvegardée
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    // Vérifier la préférence système
    if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    // Appliquer le thème au document
    document.documentElement.setAttribute("data-theme", theme);
    // Sauvegarder la préférence
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
