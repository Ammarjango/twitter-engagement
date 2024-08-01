'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useTheme } from 'context/ThemeContext'
import { Box, Button } from '@mui/material'
import { stylesMui } from '@/components/styles'
import ReferalCodeModal from '@/components/Modals/ReferalCodeModal'
import { useColorContext } from 'context/ColorContext'

const signInURL =
  'https://twitter.com/i/oauth2/authorize?client_id=TGVyOS1jd0VUXzlQRXRIOVdNblg6MTpjaQ&redirect_uri=http://3.144.0.155/api/twitter/callback&response_type=code&scope=like.write+users.read+tweet.read+tweet.write+follows.read+mute.read+like.read+block.read+offline.access&state=0-rsJAIDgALlYWs0SDQNIUWwzniGEGFfHy-OpbugHmw%3D&code_challenge=challenge&code_challenge_method=plain'

const SignIn = () => {
  const { theme, toggleTheme } = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const handleSignIn = () => {
    window.location.href = signInURL
  }

  const handleModal = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <>
      <div
        className='py-1 sm:py-12 md:h-screen min-h-min flex justify-center items-center'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div
          className='shadow-md rounded-[50px] p-16 w-[50%] max-w-[600px] z-20 mt-5 h-auto'
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
            {/* <img height='70%' width='70%' src='./pollenLogo.svg' alt='phone'></img> */}
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
            <div className='flex justify-center items-center font-roboto font-semibold text-[16px] sm:text-[16px] md:text-[24px] lg:text-[24px]'>
              Sign In using Twitter
            </div>

            <div className='flex justify-center items-center'>
              <Button
                onClick={handleSignIn}
                sx={{
                  ...stylesMui.bodyButton,
                  width: { xs: '200px', sm: '280px', md: '340px' },
                  height: { xs: '48px', sm: '56px', md: '68px' },
                  fontSize: { xs: '18px', sm: '20px', md: '24px' },
                  fontWeight: '400',
                  gap: '5px',
                }}
              >
                <Image src='/Images/TwitterXCircle.svg' width={60} height={60} alt='twitter' />
                Twitter
              </Button>
            </div>
            <p className='flex justify-center items-center font-roboto font-semibold text-[16px] leading-[0px]  md:text-[24px] lg:text-[24px]'>
              or
            </p>
            <div className='flex justify-center items-center'>
              <Button
                onClick={handleModal}
                sx={{
                  ...stylesMui.bodyButton,
                  width: { xs: '200px', sm: '280px', md: '340px' },
                  height: { xs: '48px', sm: '56px', md: '68px' },
                  fontSize: { xs: '18px', sm: '20px', md: '24px' },
                  fontWeight: '400',
                }}
              >
                Referrel Code
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ReferalCodeModal isOpen={openModal} handleClose={handleModal} />
    </>
  )
}

export default SignIn
