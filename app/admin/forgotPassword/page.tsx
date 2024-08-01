'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useTheme } from 'context/ThemeContext'
import { Box, Button } from '@mui/material'
import { stylesMui } from '@/components/styles'
import InputField from '@/components/InputFields/InputField'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useFormik } from 'formik/dist'
import { useRouter, useSearchParams } from 'next/navigation'

const ForgotPassword = () => {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const searchParams = useSearchParams()

  const newtoken = searchParams.get('token')

  const formik = useFormik({
    initialValues: { password: '', confirmpassword: '' },
    // validationSchema: FanSignInSchema,
    onSubmit: async (values, { resetForm }) => {
      const { password, confirmpassword } = values

      let data = JSON.stringify({
        password: password,
        confirmpassword: confirmpassword,
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/resetpassword`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newtoken}`,
        },
        data: data,
      }

      try {
        const response = await axios.request(config)
        toast.success('Password Updated Successfully')
        router.push('admin/home')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }

      // try {
      //   // const res = await api.SignIn(values)
      //   const res = await axios.post('http://3.144.0.155/admin/api/resetpassword', {
      //     password,
      //     confirmpassword,
      //     newtoken,
      //   })
      //   const result = res.data
      //   console.log('result :>> ', result)
      //   toast.success('Password Updated Successfully')
      //   router.push('admin/login')
      //   // if (result.success) {
      //   //   toast.success('Sign In Successfully')
      //   //   router.push('/admin/home')
      //   // } else console.log(result?.message)

      //   return result
      // } catch (error: any) {
      //   toast.error(error.response.data.message || 'An Error Occurred While Retrieving Data')
      // }
    },
  })

  return (
    <>
      <div
        className='py-1 sm:py-12 min-h-[100] flex justify-center items-center'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div
          className='shadow-xl rounded-[50px] p-16 w-8/12 max-w-[600px] z-20 mt-5 h-[80%]'
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
              <div className='flex justify-start w-[100%] md:ml-[22%] mt-12 text-[16px] sm:text-[16px] md:text-[32px] lg:text-[32px] text-left font-roboto font-bold'>
                Enter new password{' '}
              </div>
              <InputField
                // label='Sign In'
                name='password'
                placeholder='New password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <InputField
                // label='Password'
                name='confirmpassword'
                placeholder='Re enter new password'
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
              />
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

export default ForgotPassword
