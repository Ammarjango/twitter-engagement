'use client'
import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'

import { stylesMui } from '@/components/styles'
import { useColorContext } from 'context/ColorContext'

interface CategoryCardProps {
  amount: number
  title: string
  description: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ amount, title, description }) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  return (
    <div
      className={`flex flex-col justify-center items-center rounded-[5px] border lg:py-8 lg:px-6 py-2 px-2 cursor-pointer ${
        isDark ? 'bg-[#1B1712] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
      }`}
      style={{
        color: theme.palette.text.primary,
        boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
        transition: 'transform 0.3s ease',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '56px',
          textAlign: 'left',
          color: `${color}`,
        }}
      >
        {amount}
      </Typography>
      <Typography
        sx={{
          ...stylesMui.h2,
          fontSize: { xs: '14px', sm: '20px' },
          lineHeight: { xs: '28px', sm: '56px' },
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Roboto',
          textAlign: 'center',
          fontSize: { xs: '12px', sm: '20px' },
        }}
      >
        {description}
      </Typography>
    </div>
  )
}

export default CategoryCard
