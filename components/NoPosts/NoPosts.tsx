import { Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import React, { useEffect, useState } from 'react'
interface NoPostsProps {
  errorText?: string
  isAdmin?: boolean
}

const NoPosts: React.FC<NoPostsProps> = ({ errorText, isAdmin }) => {
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
      className={`w-full h-[100px] rounded-[12px] border ${
        isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
      } flex justify-center items-center`}
    >
      {isAdmin ? (
        <p
          className='text-[#FFC504] animate-bounce'
          style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 500,
            textAlign: 'left',
          }}
        >
          {errorText}
        </p>
      ) : (
        <p
          className='text-[#FFC504] animate-bounce'
          style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 500,
            textAlign: 'left',
          }}
        >
          Posts Not Available
        </p>
      )}
    </div>
  )
}

export default NoPosts
