import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    bg: string;
    text: string;
    textSecondary: string;
    border: string;
    card: string;
    cardText: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  bg: "#ffffff",
  text: "#0f172a",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  card: "#f8fafc",
  cardText: "#1e293b",
};

const darkColors = {
  bg: "#0f172a",
  text: "#f1f5f9",
  textSecondary: "#cbd5e1",
  border: "#334155",
  card: "#1e293b",
  cardText: "#f1f5f9",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
