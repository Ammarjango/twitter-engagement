import React, { useState, createContext, useContext, useEffect } from 'react'

const ColorContext = createContext()

export const useColorContext = () => useContext(ColorContext)

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('')

  useEffect(() => {
    const savedColor = localStorage.getItem('color')
    if (savedColor) {
      setColor(savedColor)
    } else {
      setColor('#f5a623')
    }
  }, [])

  useEffect(() => {
    if (!color) return
    localStorage.setItem('color', color)
  }, [color])

  return <ColorContext.Provider value={{ color, setColor }}>{children}</ColorContext.Provider>
}
