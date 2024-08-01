'use client'
import React from 'react'

interface LockIconProps {
  isDark?: boolean
}

const LockIcon: React.FC<LockIconProps> = ({ isDark = false }) => {
  return (
    <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.65866 7.13534V5.68822C3.65866 3.29324 4.38222 1.34686 8.00002 1.34686C11.6178 1.34686 12.3414 3.29324 12.3414 5.68822V7.13534'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.6177 15.818H4.38211C1.48787 15.818 0.764313 15.0944 0.764313 12.2002V10.7531C0.764313 7.85881 1.48787 7.13525 4.38211 7.13525H11.6177C14.5119 7.13525 15.2355 7.85881 15.2355 10.7531V12.2002C15.2355 15.0944 14.5119 15.818 11.6177 15.818Z'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <mask id='path-3-inside-1_64_6100' fill={isDark ? 'white' : 'black'}>
        <path fillRule='evenodd' clipRule='evenodd' d='M10.8918 11.4767H10.8983H10.8918Z' />
      </mask>
      <path
        d='M10.8918 10.4767C10.3395 10.4767 9.89177 10.9244 9.89177 11.4767C9.89177 12.029 10.3395 12.4767 10.8918 12.4767V10.4767ZM10.8983 12.4767C11.4506 12.4767 11.8983 12.029 11.8983 11.4767C11.8983 10.9244 11.4506 10.4767 10.8983 10.4767V12.4767ZM10.8918 12.4767H10.8983V10.4767H10.8918V12.4767Z'
        fill='black'
        mask='url(#path-3-inside-1_64_6100)'
      />
      <mask id='path-5-inside-2_64_6100' fill={isDark ? 'white' : 'black'}>
        <path fillRule='evenodd' clipRule='evenodd' d='M7.99666 11.4767H8.00316H7.99666Z' />
      </mask>
      <path
        d='M7.99666 10.4767C7.44438 10.4767 6.99666 10.9244 6.99666 11.4767C6.99666 12.029 7.44438 12.4767 7.99666 12.4767V10.4767ZM8.00316 12.4767C8.55544 12.4767 9.00316 12.029 9.00316 11.4767C9.00316 10.9244 8.55544 10.4767 8.00316 10.4767V12.4767ZM7.99666 12.4767H8.00316V10.4767H7.99666V12.4767Z'
        fill='black'
        mask='url(#path-5-inside-2_64_6100)'
      />
      <mask id='path-7-inside-3_64_6100' fill={isDark ? 'white' : 'black'}>
        <path fillRule='evenodd' clipRule='evenodd' d='M5.10179 11.4767H5.10829H5.10179Z' />
      </mask>
      <path
        d='M5.10179 10.4767C4.54951 10.4767 4.10179 10.9244 4.10179 11.4767C4.10179 12.029 4.54951 12.4767 5.10179 12.4767V10.4767ZM5.10829 12.4767C5.66058 12.4767 6.10829 12.029 6.10829 11.4767C6.10829 10.9244 5.66058 10.4767 5.10829 10.4767V12.4767ZM5.10179 12.4767H5.10829V10.4767H5.10179V12.4767Z'
        fill='black'
        mask='url(#path-7-inside-3_64_6100)'
      />
    </svg>
  )
}

export default LockIcon
