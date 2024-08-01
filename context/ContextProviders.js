import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'context/ThemeContext'
import { ColorProvider } from 'context/ColorContext'

export const ContextProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ColorProvider>{children}</ColorProvider>
    </ThemeProvider>
  )
}

ContextProviders.propTypes = {
  children: PropTypes.node,
  pageProps: PropTypes.object,
}
