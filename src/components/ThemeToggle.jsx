// components/ThemeToggle.jsx
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-4 py-1 rounded border text-sm font-medium shadow bg-white dark:bg-gray-800 dark:text-white"
    >
      Toggle {isDark ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
