'use client'
import React from 'react'

interface QuestionIconProps {
  isDark?: boolean
}

const QuestionIcon: React.FC<QuestionIconProps> = ({ isDark = false }) => {
  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M23.9986 12.0001C23.9986 5.91116 19.0625 0.975098 12.9736 0.975098C6.88467 0.975098 1.94861 5.91116 1.94861 12.0001C1.94861 18.089 6.88467 23.0251 12.9736 23.0251C19.0625 23.0251 23.9986 18.089 23.9986 12.0001Z'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
        strokeMiterlimit='10'
      />
      <circle cx='12.9836' cy='17.8375' r='1.125' fill={isDark ? 'white' : 'black'} />
      <path
        d='M9.61194 9.34162C9.61176 7.55074 10.8196 5.80154 13.1936 5.80151C15.5675 5.80149 17.0955 8.16869 15.9423 10.3828C14.9011 12.3819 12.9437 12.964 12.9437 15.214'
        stroke={isDark ? 'white' : 'black'}
        strokeWidth='1.2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default QuestionIcon
