'use client'
8
import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import { useColorContext } from 'context/ColorContext'

function ColorPicker() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const values = useColorContext()
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose: any = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (color: any) => {
    values.setColor(color.hex)
  }

  return (
    <div className='relative'>
      <div className='p-1 rounded inline-block cursor-pointer' onClick={handleClick}>
        <div
          className='w-9 h-9 rounded-md'
          style={{
            backgroundColor: values.color,
          }}
        ></div>
      </div>
      {displayColorPicker && (
        <div className='absolute z-10'>
          <div className='fixed inset-0' onClick={handleClose}></div>
          <SketchPicker color={values.color} onChange={handleChange} />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
