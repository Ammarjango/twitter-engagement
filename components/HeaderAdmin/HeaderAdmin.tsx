import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

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
  IconButton,
} from '@mui/material'

import { useTheme } from 'context/ThemeContext'
import QuestionIcon from '../assets/icons/QuestionIcon'
import GiftIcon from '../assets/icons/GiftIcon'
import MoonIcon from '../assets/icons/MoonIcon'
import SunIcon from '../assets/icons/SunIcon'
import BarcodeIcon from '../assets/icons/BarcodeIcon'
import MenuIcon from '../assets/icons/MenuIcon'

import { stylesMui } from '../styles'
import { useRouter } from 'next/navigation'
import { useColorContext } from 'context/ColorContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [open, SetOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  // TODO: Update setLoggedIn when integrating auth login
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isDark, setisDark] = useState(theme.palette.mode)
  const router = useRouter()
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
    height: '88px',
    '& a': {
      fontFamily: 'roboto',
      color: 'inherit',
      textDecoration: 'none',
    },
    '& a.active': {
      backgroundColor: isDark ? '#FFAD0026' : '#FFE89B',
      fontWeight: 'bold',
      padding: '10px 15px',
      borderRadius: '20px',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
    },
  })
  const LogoBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  })
  const LinksBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  })
  const SearchBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  })

  const handleOpenHamburger = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseHamburger = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_access_token')
    setIsAdminLoggedIn(false)
    router.push('/admin/login')
  }

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem('admin_access_token')) {
      // Token exists
      setIsAdminLoggedIn(true)
    } else {
      // Token does not exist
      setIsAdminLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
          <Grid sx={{ display: 'flex' }}>
            {!isSmallScreen && (
              <Link href='/admin/home'>
                <Image
                  src={isDark ? '/Images/PollenizeLogoDark.png' : '/Images/PollenizeLogoLight.png'}
                  alt='logo'
                  width={280}
                  height={70}
                />
              </Link>
            )}
            {isSmallScreen && (
              <>
                {/* TODO: fix the hamburger menu dropdown   */}
                <IconButton onClick={handleOpenHamburger}>
                  <MenuIcon isDark={isDark} />
                </IconButton>

                <Link href='/admin/home'>
                  <Image
                    src={
                      isDark
                        ? '/Images/navbarMobileLogoDark.png'
                        : '/Images/navbarMobileLogoLight.png'
                    }
                    alt='logo'
                    width={32}
                    height={32}
                    style={{ marginLeft: '1rem' }}
                  />
                </Link>
              </>
            )}
          </Grid>
        </LogoBox>

        {!isSmallScreen && (
          <LinksBox>
            <Link className={pathname === '/admin/home' ? 'active' : ''} href='/admin/home'>
              Home
            </Link>
            <Link className={pathname === '/admin/circle' ? 'active' : ''} href='/admin/circle'>
              Hive
            </Link>
            <Link
              className={pathname === '/admin/interface' ? 'active' : ''}
              href='/admin/interface'
              // className={`p-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors ${
              //   pathname === '/admin/interface' ? 'bg-blue-500 text-white' : 'text-black'
              // }`}
              // href='/admin/interface'
              // style={{ backgroundColor: color, margin: '2rem' }}
            >
              Interface
            </Link>
          </LinksBox>
        )}

        <SearchBox>
          {isSmallScreen ? (
            ''
          ) : (
            <Button
              onClick={() => {
                toast.info('Coming Soon')
              }}
              sx={stylesMui.headerButton}
            >
              Coming Soon
            </Button>
          )}
          <div className='flex gap-6 mx-6 lg:mx-8'>
            {/* <Link href='#'>
              <QuestionIcon isDark={isDark} />
            </Link>
            <Link href='#'>
              <GiftIcon isDark={isDark} />
            </Link> */}
            {/* <Link href='#'>
              <BarcodeIcon isDark={isDark} />
            </Link> */}
            <Button onClick={toggleTheme} sx={{ padding: '0px', minWidth: '25px' }}>
              {isDark ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>

          {!isAdminLoggedIn ? (
            <Button
              sx={stylesMui.headerButton}
              onClick={() => {
                router.push('/admin/login')
              }}
            >
              Sign in
            </Button>
          ) : (
            <>
              <Box>
                <Image src='/Images/genericAvatar.png' alt='avatar' width={40} height={40} />
              </Box>
              {isSmallScreen ? (
                ''
              ) : (
                <Grid>
                  <Box sx={{ marginRight: '12px' }}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                      }}
                    >
                      Super Admin
                    </Typography>
                    <Typography
                      align='left'
                      sx={{
                        fontSize: '10px',
                        color: '#807E7A',
                        fontWeight: '400',
                        fontFamily: 'Roboto',
                      }}
                    >
                      Admin
                    </Typography>
                  </Box>
                </Grid>
              )}
              <Box sx={{ marginLeft: '10px' }} onClick={() => SetOpen(!open)}>
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

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseHamburger}>
        <MenuItem>
          <Link href='/admin/home'>Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href='/admin/circle'>Hive</Link>
        </MenuItem>
        <MenuItem>
          <Link href='/admin/interface'>Interface</Link>
        </MenuItem>
      </Menu>

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
        style={{ marginTop: 60 }}
        sx={{
          '& .MuiMenu-list': {
            padding: '0px !important',
            margin: '0px !important',
            width: { xs: '100px', sm: '150px' },
            borderRadius: '0.5rem',
            backgroundColor: 'transparent !important',
          },
          '& .MuiMenu-paper': {
            backgroundColor: isDark ? 'transparent !important' : 'transparent !important',
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
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar
