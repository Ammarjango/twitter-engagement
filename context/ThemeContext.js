import { createContext, useContext, useState, useEffect } from 'react'
import { lightTheme, darkTheme } from '../app/theme/themes'

// Creating a context to hold the theme state and toggle function
export const ThemeContext = createContext()

// Using Custom hook to consume the theme context
export const useTheme = () => useContext(ThemeContext)

// Creating a provider component to manage the theme state and provide it to the rest of the components
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme)
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    // Check if a theme is stored in local storage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme))
    }
  }, [])

  // Save the theme to local storage whenever it changes
  useEffect(() => {
    if (flag) {
      localStorage.setItem('theme', JSON.stringify(theme))
    }
  }, [theme, flag])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme))
    setFlag(true)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
