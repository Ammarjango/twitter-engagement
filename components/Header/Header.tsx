import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  styled,
  Grid,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'

import { useTheme } from 'context/ThemeContext'
import QuestionIcon from '../assets/icons/QuestionIcon'
import GiftIcon from '../assets/icons/GiftIcon'
import MoonIcon from '../assets/icons/MoonIcon'
import SunIcon from '../assets/icons/SunIcon'
import BarcodeIcon from '../assets/icons/BarcodeIcon'

import { stylesMui } from '../styles'
import ReferralModal from '../Modals/ReferralModal'
import useUserDetailHook from 'Hooks/UserDetaill/userDetailHook'
import { toast } from 'react-toastify'
import { useColorContext } from 'context/ColorContext'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [open, SetOpen] = useState(false)
  // TODO: Update setLoggedIn when integrating auth login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLaunchAppModalOpen, setIsLaunchAppModalOpen] = useState(false)
  const { userDetails } = useUserDetailHook()
  const searchParams = useSearchParams()
  const { color } = useColorContext()

  const blockedUser = userDetails && userDetails?.data?.userData[0]?.isBlock

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const newtoken = searchParams.get('token')
  if (newtoken) {
    localStorage.setItem('loginToken', newtoken)
  }

  if (blockedUser) {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('loglevel')
    window.location.reload()
  }

  const StyledToolbar = styled(Toolbar)({
    // display: "flex",
    justifyContent: 'space-between',
    height: '88px',
  })
  const LogoBox = styled(Box)({
    display: 'flex',
    // gap: 12,
  })
  const SearchBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  })

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken')
    if (loginToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024) // Set breakpoint for small screen
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleBarCodeClick = () => {
    setIsModalOpen(true)
  }

  const handleLaunchApp = () => {
    setIsLaunchAppModalOpen(true)
  }

  const handleSignInClick = () => {
    router.push('/user/login')
  }

  const action = () => {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('loglevel')
    window.location.reload()
  }

  const handleLogOutClick = () => {
    router.push('/')
    toast.success('Logout Successfully')
    action()
  }

  const username = userDetails && userDetails?.data?.userData[0]?.username
  const referalCode = userDetails && userDetails?.data?.userData[0]?.referralCode
  // const imageUrl =
  //   userDetails &&
  //   userDetails?.data &&
  //   userDetails?.data?.userData[0] &&
  //   userDetails?.data?.userData[0]?.profileImageUrl

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        paddingLeft: { xs: '0px', lg: '55px' },
        paddingRight: { xs: '0px', lg: '55px' },
        boxShadow: 'none',
      }}
      position={'static'}
    >
      <StyledToolbar>
        <LogoBox>
          <Grid>
            <div className='flex gap-2 lg:gap-4'>
              <Typography alignContent='center' sx={stylesMui.sectionText}>
                Beta
              </Typography>
              {!isSmallScreen && (
                <Link href='/'>
                  <Image
                    src={
                      isDark ? '/Images/PollenizeLogoDark.png' : '/Images/PollenizeLogoLight.png'
                    }
                    alt='logo'
                    width={280}
                    height={70}
                  />
                </Link>
              )}
            </div>
            {isSmallScreen && (
              <Link href='/'>
                <Image
                  src={
                    isDark
                      ? '/Images/navbarMobileLogoDark.png'
                      : '/Images/navbarMobileLogoLight.png'
                  }
                  alt='logo'
                  width={32}
                  height={32}
                />
              </Link>
            )}
          </Grid>
        </LogoBox>

        <SearchBox>
          {isSmallScreen ? (
            ''
          ) : (
            <Button onClick={handleLaunchApp} sx={stylesMui.headerButton}>
              Coming Soon
            </Button>
          )}
          <div className='flex gap-4 lg:gap-6 mx-6 lg:mx-10'>
            <Link href='user/aboutUs'>
              <QuestionIcon isDark={isDark} />
            </Link>
            <Link href='user/airdrop'>
              <GiftIcon isDark={isDark} />
            </Link>
            <div className='cursor-pointer' onClick={handleBarCodeClick}>
              <BarcodeIcon isDark={isDark} />
            </div>
            <Button onClick={toggleTheme} sx={{ padding: '0px', minWidth: '25px' }}>
              {isDark ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>

          {!isLoggedIn ? (
            isSmallScreen ? (
              <Button
                onClick={handleSignInClick}
                sx={{
                  ...stylesMui.headerButton,
                  // maxWidth: '2rem',
                  // maxHeight: '2rem',
                  fontSize: '12px',
                  padding: '10px 10px',
                }}
              >
                Sign in
              </Button>
            ) : (
              <Button onClick={handleSignInClick} sx={stylesMui.headerButton}>
                Sign in
              </Button>
            )
          ) : (
            <>
              <Box sx={{ marginTop: '10px' }}>
                <Image
                  priority={true}
                  src={
                    userDetails &&
                    userDetails.data &&
                    userDetails.data.userData[0] &&
                    userDetails.data.userData[0].profileImageUrl
                      ? userDetails.data.userData[0].profileImageUrl
                      : '/Images/genericAvatar.png'
                  }
                  alt=''
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
              </Box>

              <Grid>
                <Box
                  sx={{
                    marginTop: '10px',
                    marginRight: '12px',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                    }}
                  >
                    {username}
                  </Typography>
                  {isLoggedIn && (
                    <Typography
                      align='left'
                      sx={{
                        fontSize: '10px',
                        color: '#807E7A',
                        fontWeight: '400',
                        fontFamily: 'Roboto',
                      }}
                    >
                      User
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Box sx={{ marginLeft: '10px', marginTop: '20px' }} onClick={() => SetOpen(!open)}>
                <svg
                  width='14'
                  height='8'
                  viewBox='0 0 14 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L7 7L13 1'
                    stroke={isDark ? 'white' : 'black'}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M1 1L7 7L13 1'
                    stroke={isDark ? 'white' : 'black'}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Box>
            </>
          )}
        </SearchBox>
      </StyledToolbar>

      {isLoggedIn && (
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          open={open}
          onClose={() => SetOpen(!open)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          style={{
            marginTop: 60,
          }}
          sx={{
            '& .MuiMenu-list': {
              padding: '0px !important',
              margin: '0px !important',
              width: { xs: '100px', sm: '150px' },
              borderRadius: '0.5rem',
              backgroundColor: 'transparent !important',
            },
            '& .MuiMenu-paper': {
              backgroundColor: isDark ? 'transparent !important' : 'transparent  !important',
              borderRadius: '2rem !important',
            },
            '& .MuiMenu-root': {
              borderRadius: '2rem !important',
              backgroundColor: 'transparent !important',
            },
          }}
        >
          <MenuItem
            sx={{
              width: 250,
              backdropFilter: 'blur(10px)',
              borderRadius: '2rem !important',
              backgroundColor: 'transparent',
              padding: '0px',
              margin: '0px',
            }}
          >
            {/* <Typography>To Do Menu</Typography> */}
            <Button
              sx={{
                ...stylesMui.bodyButton,
                borderRadius: '2rem',
                width: { xs: '100px', sm: '150px' },
              }}
              onClick={handleLogOutClick}
            >
              Log Out
            </Button>
          </MenuItem>
          {/* <Box sx={{ width: 250, height: '50vh' }}> */}
          {/* <div style={{ backdropFilter: 'blur(10px)', paddingTop: '0px', paddingBottom: '0px' }}> */}
          {/* TODO: user menu with logout  */}
          {/* <Button
              onClick={handleLogOutClick}
              sx={{
                ...stylesMui.headerButton,
                borderRadius: '2rem',
                width: { xs: '100px', sm: '150px' },
              }}
            >
              Log Out
            </Button> */}
          {/* <MenuItem
            onClick={handleLogOutClick}
            sx={{ ...stylesMui.deleteButton, borderRadius: 'none' }}
          >
            Log Out
          </MenuItem> */}
          {/* </div> */}
        </Menu>
      )}
      <ReferralModal
        firstheading='Referral Link'
        firstbutton='Close'
        secondbutton='Share Code'
        referralCode={referalCode}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        isLoggedIn={isLoggedIn}
      />
      <ReferralModal
        firstheading=''
        firstbutton=''
        secondbutton=''
        isOpen={isLaunchAppModalOpen}
        handleClose={() => setIsLaunchAppModalOpen(false)}
        isLauchAppModal={true}
      />
    </AppBar>
  )
}

export default Navbar
