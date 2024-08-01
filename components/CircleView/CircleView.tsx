'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { useTheme } from 'context/ThemeContext'

import PostCard from '@/components/PostCard/PostCard'
import Pagination from '@/components/Pagination'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateHref } from 'utils/generateHref'
import NoPosts from '@/components/NoPosts'

import { stylesMui } from '@/components/styles'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import AdminAuth from 'app/admin/AdminAuth'

interface CircleViewPostProps {
  hiveName: string
  dailyPosts: number
  totalDailyPosts: number
}

// TODO: remove default set for the props from homepage linking
const CircleViewPost: React.FC<CircleViewPostProps> = ({
  hiveName = 'John Michael',
  dailyPosts = 2,
  totalDailyPosts = 4,
}) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [postsDone, setPostsDone] = useState(0)
  const [totalPosts, setTotalPosts] = useState(2)
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState(false)
  const [circleData, setCircleData] = useState<any>()
  const [adminToken, setAdminToken] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const searchParams = useSearchParams()

  const circleId = searchParams.get('circleId')

  if (circleData) {
    hiveName = circleData.circleName
  }

  useEffect(() => {
    const savedValue = window.localStorage.getItem('admin_access_token')
    setAdminToken(savedValue || '')
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/show/circle/posts/${circleId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      )
      console.log('response :>> ', response)
      setCircleData(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [adminToken])

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

  const totalCirclePosts = circleData?.posts.length
  console.log('totalCirclePosts :>> ', totalCirclePosts)
  const totalPages = Math.ceil(totalCirclePosts / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const currentData = circleData?.posts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div
      id='wrapper'
      className='min-h-screen'
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className='px-6 lg:px-20'>
        <Breadcrumbs pages={pages} />
      </div>
      <div
        id='header-desktop'
        className='hidden lg:flex lg:flex-wrap lg:justify-between px-20 pt-8'
      >
        <Typography sx={stylesMui.h1}>{hiveName}</Typography>
        <div className='flex justify-between items-center gap-2 w-full mt-16'>
          <Button
            sx={{
              ...stylesMui.bodyButton,
              px: '2rem',
              backgroundColor: isDark ? '#1B1507' : '#DCDCDC',
              color: theme.palette.text.primary,
            }}
          >
            All Account
          </Button>
          <Button sx={{ ...stylesMui.bodyButton, px: '2rem' }}>Show All</Button>
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
        <div className='flex flex-col justify-between gap-8'>
          <Typography sx={stylesMui.h1}>{hiveName}</Typography>
        </div>
        <div className='flex sm:flex-row items-center gap-2 mt-6'>
          <Button sx={{ ...stylesMui.bodyButton, width: '100%' }}>All Account</Button>
          <Button sx={{ ...stylesMui.bodyButton, width: '100%' }}>Show All</Button>
        </div>
      </div>

      {circleData?.posts.length === 0 && (
        <div className='px-6 lg:px-20 mt-10'>
          -
          <NoPosts />
        </div>
      )}
      <div
        id='summary'
        className='grid grid-cols-2 sm:grid sm:mx-0 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-6 pt-4 lg:px-20 lg:pt-12'
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        {currentData?.length > 0 && (
          <>
            {currentData?.map((post: any, index: any) => (
              <PostCard
                key={index}
                isEngaged={post.isEngaged}
                isAdmin={true}
                isCircleView={true}
                postLink={post?.tweetId}
                adminTweetUserId={post?.userId}
                adminDeletePostId={post?._id}
              />
            ))}
          </>
        )}
      </div>

      {circleData?.posts.length > 8 && (
        <>
          <div
            id='pagination'
            className='flex justify-center py-12'
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Pagination current={currentPage} total={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminAuth(CircleViewPost)
