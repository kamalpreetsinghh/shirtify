"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}
      className="toggle-btn"
    >
      {theme === "dark" ? (
        <FaMoon className="w-6 h-6 text-primary" />
      ) : (
        <FaSun className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default ThemeSwitch;
