import { useTheme } from 'context/ThemeContext'
import React from 'react'

interface Props {
  type?: string
  name: string
  value?: any
  onChange: any
  label?: string
  placeholder: string
  svg?: any
  colorFeild?: boolean
  isListingModal?: boolean
  fieldRadius?: any
  accept?: string
}

const InputFeild = ({
  type,
  name,
  value,
  onChange,
  label,
  placeholder,
  svg,
  colorFeild,
  isListingModal,
  accept,
  fieldRadius,
}: Props) => {
  const { theme } = useTheme()
  return (
    <div
      className={`flex relative ${isListingModal ? 'md:w-[95%]' : 'md:w-[80%]'} w-full  flex-col`}
    >
      <label
        className={`${
          isListingModal
            ? 'font-satoshi font-normal text-base text-[black]'
            : 'font-roboto font-medium text-xl text-[#6B778C]'
        }  py-2`}
        style={{ color: theme.palette.text.primary }}
      >
        {label}{' '}
        <span className={`${isListingModal ? 'text-black-2' : 'text-[#DE350B]'}  text-base`}>
          {!isListingModal && label && '*'}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        accept={accept}
        onChange={onChange}
        className={`h-[40px]  w-70% ${
          isListingModal ? ' rounded-[12px]' : 'border-[#F4F5F7]'
        } bg-[#FAFBFC] rounded-[12px] p-2 border shadow-xl`}
      />
      <span className={`absolute ${colorFeild ? 'top-[2.4rem] right-1' : 'top-[3.2rem] right-2'} `}>
        {svg}
      </span>
    </div>
  )
}

export default InputFeild
