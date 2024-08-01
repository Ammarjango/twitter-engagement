import React from 'react'

interface props {
  color?: boolean
}

const BtnLoader = ({ color }: props) => {
  return (
    <>
      <div
        className={`h-5 w-5 animate-spin rounded-full border-4 border-solid ${
          color ? 'border-[white]' : 'border-[black]'
        }  border-t-transparent`}
      ></div>
    </>
  )
}

export default BtnLoader
