'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateHref } from 'utils/generateHref'
import { stylesMui } from '@/components/styles'
import InputField from '@/components/InputFields/InputField'
import ColorPicker from '@/components/ColorPicker/ColorPicker'
import { useColorContext } from 'context/ColorContext'

interface InterfacesProps {
  hiveName: string
  dailyPosts: number
  totalDailyPosts: number
}

// TODO: remove default set for the props from homepage linking
const Interfaces: React.FC<InterfacesProps> = ({
  hiveName = 'Interface',
  dailyPosts = 2,
  totalDailyPosts = 4,
}) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [appliedImage, setAppliedImage] = useState<string | null>(null)
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  // for breadcrumbs
  const pages = [
    { title: 'Home', href: '/' },
    { title: hiveName, href: generateHref(hiveName) },
  ]

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  const handleCreatePost = () => {
    setIsModalOpen(true)
  }

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setUploadedImage(e.target.result) // Store the uploaded image
      }
      reader.readAsDataURL(file) // Read as Data URL
    }
  }

  const handleApply = () => {
    if (uploadedImage) {
      setAppliedImage(uploadedImage) // Update the logo with the uploaded image
    }
  }

  return (
    <div
      id='wrapper'
      className='min-h-screen overflow-y-hidden'
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className='px-6 lg:px-20'>
        <Breadcrumbs pages={pages} />
      </div>
      <div id='header-desktop' className='mt-8 ml-20 hidden lg:inline-flex'>
        <Typography sx={stylesMui.h1}>{hiveName}</Typography>
        {appliedImage && <Image src={appliedImage} alt='Applied Logo' width={100} height={100} />}
      </div>
      <div id='header-desktop' className='hidden lg:flex lg:flex-wrap lg:justify-start px-20 pt-8'>
        <div className='flex justify-start items-center gap-12 w-[60vw]'>
          <InputField
            label='Logo'
            name='logo'
            placeholder='Upload Logo'
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            svg={
              uploadedImage && (
                <Image src={uploadedImage} alt='Uploaded Image' width={40} height={40} />
              )
            }
          />
          <InputField
            label='Color Element'
            name='color'
            placeholder='Select Color'
            value={color}
            onChange={() => console.log('this')}
            svg={<ColorPicker />}
          />
          <div className='mt-10'>
            <Button
              onClick={handleApply}
              sx={{
                ...stylesMui.bodyButton,
                px: '2rem',
                width: '108px',
                height: '48px',
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      <div
        id='header-mobile'
        className='lg:hidden px-6 pt-6'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography sx={stylesMui.h1}>{hiveName}</Typography>
        {/* {appliedImage && <Image src={appliedImage} alt='Applied Logo' width={100} height={100} />} */}
        <div className='flex flex-col sm:flex-col md:flex-row items-center gap-4 mt-6 md:items-end'>
          <InputField
            label='Logo'
            name='logo'
            placeholder='Upload Logo'
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            svg={
              uploadedImage && (
                <Image src={uploadedImage} alt='Uploaded Image' width={40} height={40} />
              )
            }
          />
          <InputField
            label='Color Element'
            name='color'
            placeholder='Select Color'
            accept='image/*'
            onChange={() => console.log('this')}
            value={color}
            svg={<ColorPicker />}
          />
          <Button
            onClick={handleApply}
            sx={{ ...stylesMui.bodyButton, width: '108px', height: '48px' }}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Interfaces
