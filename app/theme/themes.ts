'use client'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    smm: true
    md: true
    lg: true
    xl: true
  }
}
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#FFFFFF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      smm: 767,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // all head buttons
        containedPrimary: {
          borderRadius: '100px',
          background: '#FFC504',
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 500,
          textTransform: 'capitalize',
          '&:hover': {
            background: '#fff',
          },
        },
        // all body buttons
        containedSecondary: {
          borderRadius: '12px',
          background: '#ECC115',
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'capitalize',
          '&:hover': {
            background: '#4C33E6',
          },
        },
      },
    },
  },
  typography: {
    h1: {
      textAlign: 'start',
      fontFamily: 'Roboto',
      fontSize: '32px',
      lineHeight: '56px',
      fontStyle: 'normal',
      fontWeight: 700,
      textTransform: 'capitalize',
      color: 'black',
    },
    h2: {
      fontFamily: 'Adamina',
      fontSize: '2.53125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    // faq accordian titles
    h3: {
      fontFamily: 'Adamina',
      fontSize: '1.3125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    // footer headings
    h4: {
      textAlign: 'center',
      fontFamily: 'Adamina',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 400,
      // lineHeight: '60px',
      textTransform: 'uppercase',
    },
    subtitle1: {
      textAlign: 'center',
      fontFamily: 'Inter',
      fontSize: '1.125rem',
      fontStyle: 'normal',
      fontWeight: 400,
    },
    // h2 subtitle
    subtitle2: {
      textAlign: 'center',
      fontFamily: 'Adamina',
      fontSize: '0.9375rem',
      fontStyle: 'normal',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: 'Adamina',
      fontSize: '1.78125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      // lineHeight: '40.5px',
    },
    body2: {
      fontFamily: 'Adamina',
      fontSize: '1.78125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      // lineHeight: '40.5px',
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC504',
      light: '#ECC115',
    },
    secondary: {
      main: '#201D17',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      smm: 767,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // all head buttons
        containedPrimary: {
          borderRadius: '100px',
          background: '#FFC504',
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: 500,
          textTransform: 'capitalize',
          '&:hover': {
            background: '#fff',
          },
        },
        // all body buttons
        containedSecondary: {
          borderRadius: '12px',
          background: '#ECC115',
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'capitalize',
          '&:hover': {
            background: '#4C33E6',
          },
        },
      },
    },
  },
  typography: {
    h1: {
      textAlign: 'start',
      fontFamily: 'Roboto',
      fontSize: '32px',
      lineHeight: '56px',
      fontStyle: 'normal',
      fontWeight: 700,
      textTransform: 'capitalize',
      color: 'black',
    },
    h2: {
      fontFamily: 'Adamina',
      fontSize: '2.53125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    // faq accordian titles
    h3: {
      fontFamily: 'Adamina',
      fontSize: '1.3125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    // footer headings
    h4: {
      textAlign: 'center',
      fontFamily: 'Adamina',
      fontSize: '1.5rem',
      fontStyle: 'normal',
      fontWeight: 400,
      // lineHeight: '60px',
      textTransform: 'uppercase',
    },
    subtitle1: {
      textAlign: 'center',
      fontFamily: 'Inter',
      fontSize: '1.125rem',
      fontStyle: 'normal',
      fontWeight: 400,
    },
    // h2 subtitle
    subtitle2: {
      textAlign: 'center',
      fontFamily: 'Adamina',
      fontSize: '0.9375rem',
      fontStyle: 'normal',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: 'Adamina',
      fontSize: '1.78125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      // lineHeight: '40.5px',
    },
    body2: {
      fontFamily: 'Adamina',
      fontSize: '1.78125rem',
      fontStyle: 'normal',
      fontWeight: 400,
      // lineHeight: '40.5px',
    },
  },
})
