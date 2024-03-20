import { useTheme } from 'hooks/useTheme';
import { useState, useEffect } from 'react';

function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  // useEffect(() => {
  //   const isDarkMode = localStorage.getItem('darkMode') === 'true';
  //   setDarkMode(isDarkMode);
  // }, []);

  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', darkMode);
  //   darkMode
  //     ? localStorage.setItem('darkMode', 'true')
  //     : localStorage.setItem('darkMode', 'false');
  //   setTheme(darkMode ? "dark" : "light")
  // }, [darkMode]);

  // const toggleDarkMode = () => {
  //   setDarkMode((prevMode) => !prevMode);
  // };

  const darkClass = "after:content-[''] light-icon dark:text-white after:absolute after:left-1 flex items-center text-base  dark-icon peer-checked:dark:text-yellow-1 after:hidden peer-checked:after:inline"

  const lightClass = "light-icon before:content-[''] dark:text-white before:absolute before:right-1 flex items-center text-base  dark-icon peer-checked:dark:text-yellow-1 before:inline peer-checked:before:hidden"
  return (
    <div className="relative inline-flex items-center w-12 h-6 align-middle transition duration-200 ease-in select-none">
      <input
        type="checkbox"
        className="absolute left-0 block w-5 h-5 mx-1 transition-all duration-100 rounded-full appearance-none cursor-pointer bg-yellow-2 dark:bg-yellow-1 peer checked:left-5 checked:dark:bg-yellow-1"
        checked={theme == 'dark'}
        name="dark-mode"
        id="dark-toggle"
        readOnly
        onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')} />
      <label
        htmlFor="dark-toggle"
        className={`overflow-hidden rounded-full h-6 w-13 dark:bg-dark-5 bg-slate-100 peer-checked:dark:bg-dark-4 cursor-pointer ${theme == 'dark' ? darkClass : lightClass}`}></label>
    </div>
  )

}

export default ThemeSwitch;

