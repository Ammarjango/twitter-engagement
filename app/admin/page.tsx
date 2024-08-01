'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useTheme } from 'context/ThemeContext'
import { Box, Button } from '@mui/material'
import { stylesMui } from '@/components/styles'
import { useColorContext } from 'context/ColorContext'

const Landing = () => {
  const { theme, toggleTheme } = useTheme()
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  return (
    <>
      <div
        className='py-1 sm:py-12 h-[100vh] flex justify-center items-center'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div
          className='shadow-md rounded-[50px] p-16 w-8/12 max-w-[600px] z-20 mt-5 h-[70%]'
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              maxHeight: '80%',
              marginBottom: '16px',
              display: 'flex',
              justifyItems: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Image src='/Images/pollenLogo.svg' width={209} height={180} alt='logo' />
          </Box>
          <div className='mt-12 text-[16px] sm:text-[16px] md:text-[32px] lg:text-[32px] text-left text-[#FFC504] font-russoone font-normal'>
            “Wait, why do I need to sign in?!”{' '}
          </div>
          <div className='mt-12 text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-left font-roboto font-light'>
            Pollen Hive requests the minimum access required by the Twitter API. We have no control
            over your account, access to your email, or access to your DM&apos;s.{' '}
          </div>
          <div className='mt-12 text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-left font-roboto font-light'>
            We use Read Only access simply to verify that your engagement has been completed. Read
            more about Read Only access on the Twitter docs here.{' '}
          </div>
          <div className='mt-10 flex flex-col justify-center items-center gap-5'>
            <div className='flex justify-center items-center'>
              <Link href={'admin/login'}>
                <Button
                  sx={{
                    ...stylesMui.bodyButton,
                    width: { xs: '200px', sm: '280px', md: '340px' },
                    height: { xs: '48px', sm: '56px', md: '68px' },
                    fontSize: { xs: '18px', sm: '20px', md: '24px' },
                    fontWeight: '400',
                  }}
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
