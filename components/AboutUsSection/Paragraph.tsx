import React from 'react'

interface Props {
  text: string
}
const Paragraph = ({ text }: Props) => {
  return (
    <>
      <p className='font-roboto text-[16px] leading-[26px] font-normal  py-[6px] m-0'>{text}</p>
    </>
  )
}

export default Paragraph
