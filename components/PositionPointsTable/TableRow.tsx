'use client'
import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { useTheme } from 'context/ThemeContext'

import { stylesMui } from '@/components/styles'

interface TableRowProps {
  position: number
  user: string
  points: number
  isSelf?: boolean
}

const TableRow: React.FC<TableRowProps> = ({ position, user, points, isSelf = false }) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  return (
    <div
      className={`grid grid-cols-6 gap-6 rounded-[5px] border py-4 lg:py-0 lg:h-[60px] my-2 ${
        isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
      } ${isSelf ? 'opacity-75 bg-[#c9c12f33]' : ''}`}
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
      <Typography className='col-span-2 flex items-center justify-center' sx={stylesMui.h6}>
        {position}
      </Typography>
      <Typography className='col-span-2 flex items-center justify-center' sx={stylesMui.h6}>
        {user}
      </Typography>
      <Typography className='col-span-2 flex items-center justify-center' sx={stylesMui.h6}>
        {points}
      </Typography>
    </div>
  )
}

export default TableRow
