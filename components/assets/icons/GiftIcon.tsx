'use client'
import React from 'react'

interface GiftIconProps {
  isDark?: boolean
}

const GiftIcon: React.FC<GiftIconProps> = ({ isDark = false }) => {
  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='1.8739'
        y='4.19995'
        width='22.2'
        height='5.7'
        rx='1.5'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
      />
      <path
        d='M13.0538 4.0603L18.208 0.964852C18.6814 0.680505 19.2825 0.841458 19.5505 1.32435L21.2241 4.33969'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
      />
      <path
        d='M12.8941 4.0603L7.73992 0.964852C7.26646 0.680505 6.66537 0.841458 6.39735 1.32435L4.72375 4.33969'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
      />
      <path
        d='M9.97375 9.8999H15.9738V16.5543C15.9738 16.9346 15.566 17.1757 15.2328 16.9924L13.4557 16.015C13.1556 15.8499 12.7919 15.8499 12.4918 16.015L10.7147 16.9924C10.3815 17.1757 9.97375 16.9346 9.97375 16.5543V9.8999Z'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
        strokeLinejoin='round'
      />
      <path
        d='M3.3739 9.8999H22.5739V21.0999C22.5739 22.2045 21.6785 23.0999 20.5739 23.0999H5.3739C4.26933 23.0999 3.3739 22.2045 3.3739 21.0999V9.8999Z'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default GiftIcon
