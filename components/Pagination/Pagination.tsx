'use client'
import React, { useEffect, useState } from 'react'
import { createTheme, Stack, ThemeProvider } from '@mui/material'
import PaginationMui from '@mui/material/Pagination'
import { useTheme } from 'context/ThemeContext'

interface PaginationProps {
  current: number
  total: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [page, setPage] = useState(current)

  const customTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#1B1507' : '#000',
      },
      secondary: {
        main: isDark ? '#fff' : '#0000FF',
      },
    },
  })

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  useEffect(() => {
    setPage(current)
  }, [current])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    onPageChange(value)
  }

  return (
    <Stack spacing={2}>
      <ThemeProvider theme={customTheme}>
        <PaginationMui
          count={total}
          page={page}
          onChange={handlePageChange}
          variant='outlined'
          shape='rounded'
          color={isDark ? 'secondary' : 'primary'}
        />
      </ThemeProvider>
    </Stack>
  )
}

export default Pagination
