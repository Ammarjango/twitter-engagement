'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Typography, Stack, Grid } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '@/components/styles'
import HiveRow from '@/components/HiveRow/HiveRow'
import Pagination from '@/components/Pagination'
import Header from '@/components/Header'
import Loader from '@/components/Loader/Loader'
import ProtectedRoutes from './user/ProtectedRoutes'
import * as api from '../utils/api'
import { useColorContext } from 'context/ColorContext'

const Home = () => {
  const { theme } = useTheme()
  const { color } = useColorContext()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [circleData, setCircleData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [getToken, setGetToken] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const router = useRouter()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const totalPages = Math.ceil(circleData?.circle && circleData?.circle.length / itemsPerPage)

  const currentData =
    circleData?.circle &&
    circleData?.circle.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const savedValue = window.localStorage.getItem('loginToken')
    setGetToken(savedValue || '')
    setIsSmallScreen(window.innerWidth < 1024)
  }, [])

  // /////////////////////////////////////Get Circles//////////////////////
  const getCircles = async () => {
    try {
      setLoading(true)
      const response = await api.getUserSideCircles()
      setCircleData(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCircles()
  }, [getToken])

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  return (
    <>
      <Header />
      <div
        id='wrapper'
        className='min-h-screen'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div id='hero-desktop' className='hidden lg:grid lg:grid-cols-1 lg:gap-4 px-20 pt-8'>
          <Typography sx={stylesMui.h1}>
            Where engagement grows, opportunities&apos; bloom!
          </Typography>
          <Typography sx={stylesMui.sectionText}>
            Click "Join" to enter a Hive and begin using the ultimate app of engagement
          </Typography>
        </div>

        {/* <div id='hive-absolute' className='relative w-full'>
          <div className='absolute top-[80px] left-0 lg:-top-[10px]'>
            <Image src='/Images/hiveBg.svg' width={100} height={100} alt='hive' />
          </div>
        </div> */}

        <div
          id='hero-mobile'
          className='lg:hidden px-6 pt-6'
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Typography sx={stylesMui.h1}>
            Where engagement grows,
            <br /> opportunities&apos; bloom !
          </Typography>
          <Typography style={{ marginTop: '1rem' }} sx={stylesMui.sectionText}>
            Click "Join" to enter a Hive and begin using the ultimate app of engagement
          </Typography>
        </div>

        {loading ? (
          <div className='flex flex-col flex-nowrap gap-2 px-6 pt-4 lg:px-20 lg:pt-12 h-[10rem] w-full  justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <div
            id='summary'
            className='flex flex-col flex-nowrap gap-2 px-6 lg:px-20'
            style={{
              backgroundColor: theme.palette.background.default,
              marginTop: isSmallScreen ? '3rem' : '2rem',
            }}
          >
            {currentData && currentData.length > 0 ? (
              currentData.map((hive: any, index: number) => (
                <HiveRow
                  key={index}
                  hiveName={hive.name}
                  completed={hive.members.length}
                  id={hive._id}
                  link={hive.link}
                  action={hive.action}
                  isLocked={hive.isLocked}
                  postCount={hive.postCount}
                />
              ))
            ) : (
              <div className='w-full h-screen flex justify-center items-center'>
                <p className='text-[#FFC504] animate-bounce'>No data Available</p>
              </div>
            )}
          </div>
        )}

        {circleData?.circle.length >= 10 && (
          <div
            id='pagination'
            className='flex justify-center py-12'
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Pagination current={1} total={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  )
}

export default ProtectedRoutes(Home)
