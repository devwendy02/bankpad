import React, { useContext } from "react";
import ThemeContext from "contexts/ThemeContext";

export function useTheme(): { theme: string; setTheme: (val) => void } {
  const { theme, setTheme } = useContext(ThemeContext);
  return { theme, setTheme };
}
