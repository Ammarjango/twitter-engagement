'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useTheme } from 'context/ThemeContext'
import { Box, Button, Typography, Checkbox } from '@mui/material'
import { stylesMui } from '@/components/styles'
import InputField from '@/components/InputFields/InputField'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik/dist'
import { API } from '@/components/API/api'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useColorContext } from 'context/ColorContext'

const login = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleForgotPassword = async () => {
    let data = JSON.stringify({
      email: `${formik.values.email}`,
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/adminforgetpassword/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    try {
      const response = await axios.request(config)
      toast.success('Reset Link Sent Successfully')
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    // validationSchema: FanSignInSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values
      if (rememberMe) {
        localStorage.setItem('email', values.email)
        localStorage.setItem('password', values.password)
      } else {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
      }
      try {
        // const res = await api.SignIn(values)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`, values)
        const result = res.data
        localStorage.setItem('admin_access_token', result.accessToken)

        if (result.status == true) {
          router.push('/admin/home')
        } else toast.error(result?.message)

        return result
      } catch (error: any) {
        toast.error(error.response.data.message || 'An Error Occurred While Retrieving Data')
      }
    },
  })

  useEffect(() => {
    const { email, password } = localStorage
    if (email && password) {
      formik.setFieldValue('email', email)
      formik.setFieldValue('password', password)
      setRememberMe(true)
    } else {
      setRememberMe(false)
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
  }, [])

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

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
          className='shadow-md rounded-[50px] py-16 px-6 w-[70vw] max-w-[600px] z-20 mt-5 h-[80%]'
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
          <form onSubmit={formik.handleSubmit}>
            <div className='mt-10 flex flex-col justify-center items-center gap-5'>
              <InputField
                // label='Sign In'
                name='email'
                placeholder='Sign in'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <InputField
                // label='Password'
                name='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                type='password'
              />
            </div>
            <div className='mt-5 flex justify-around items-center gap-1'>
              <label
                htmlFor='rememberMe'
                style={{ color: theme.palette.text.primary }}
                className='xs:text-[6px] md:text-[16px] font-roboto'
              >
                <Checkbox
                  id='rememberMe'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: isDark ? '#FBFBFB' : '#1B1507',
                    fontSize: { xs: '12px', sm: '16px' },
                  }}
                />
                <span style={{ fontSize: '14px' }}>Remember me</span>
              </label>
              <Typography
                className='font-roboto'
                sx={{
                  color: theme.palette.text.primary,
                  textDecoration: 'none',
                  fontSize: { xs: '14px' },
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handleForgotPassword()
                }}
              >
                Forgot password?
              </Typography>
              {/* </Typography> */}
            </div>
            <div className='mt-10 flex flex-col justify-center items-center gap-5'>
              <div className='flex justify-center items-center'>
                {/* <Link href={'/login'}> */}
                <Button
                  type='submit'
                  sx={{
                    ...stylesMui.bodyButton,
                    width: { xs: '200px', sm: '280px', md: '340px' },
                    height: { xs: '48px', sm: '56px', md: '68px' },
                    fontSize: { xs: '18px', sm: '20px', md: '24px' },
                    fontWeight: '400',
                  }}
                >
                  Sign in Dashboard
                </Button>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default login
