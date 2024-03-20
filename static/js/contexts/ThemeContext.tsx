import { BANK_THEME } from "config"
import { useState, createContext, useEffect } from "react"

const ThemeContext = createContext({
  theme: "dark",
  setTheme: (val) => { },
})

export default ThemeContext

export function ThemeProvider(props) {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const storageValue = localStorage.getItem(BANK_THEME) || 'dark';
    setTheme(storageValue === "dark" ? "dark" : "light")
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme == 'dark');
  }, [theme])

  const updateTheme = (theme_) => {
    localStorage.setItem(BANK_THEME, theme_)
    setTheme(theme_)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
