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
import EngagementIcon from '@/components/assets/icons/EngagementIcon'
import NoPosts from '@/components/NoPosts'

import { stylesMui } from '@/components/styles'
import CreateModal from '@/components/Modals/CreateModal'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userData, setUserData] = useState<any>()
  const [adminToken, setAdminToken] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const searchParams = useSearchParams()

  const userName = searchParams.get('userName')
  const userId = searchParams?.get('userId')
  const circleId = searchParams?.get('circleId')

  if (userName) {
    hiveName = userName
  }

  useEffect(() => {
    const savedValue = window.localStorage.getItem('admin_access_token')
    setAdminToken(savedValue || '')
  }, [])

  const fetchData = async () => {
    try {
      let data = { userId: userId, circleId: circleId }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/show/user/post/`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
        },
      )
      setUserData(response.data)
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

  const handleCreatePost = () => {
    setIsModalOpen(true)
  }

  const totalPosts = userData?.data?.length
  const totalPages = Math.ceil(totalPosts / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const currentData = userData?.data?.slice(
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
        <div className='flex gap-2'>
          <Button sx={stylesMui.suspendButton}>Suspend</Button>
          <Button
            sx={{
              ...stylesMui.deleteButton,
              '&:hover': {
                backgroundColor: '#FF0000',
              },
            }}
          >
            Block
          </Button>
          <Button sx={stylesMui.accountDeleteButton}>
            <Image
              src={'/Images/trash.svg'}
              alt='delete'
              width={16}
              height={16}
              style={{ paddingRight: '0.5rem' }}
            />
            Account Delete
          </Button>
        </div>
        {/* <div className='flex justify-between items-center gap-2 w-full mt-16'>
          <Button
            sx={{
              ...stylesMui.bodyButton,
              px: '2rem',
              backgroundColor: isDark ? '#1B1507' : '#DCDCDC',
              color: theme.palette.text.primary,
            }}
          >
            All Acocunt
          </Button>
          <Button onClick={handleCreatePost} sx={{ ...stylesMui.bodyButton, px: '2rem' }}>
            Show All
          </Button>
          <div className='flex items-center justify-end gap-8 w-full'>
            <EngagementIcon isActive={true} />
            <Typography>Engagements Completed</Typography>
            <div
              className={`w-[95px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>0h 50m 0s</Typography>
            </div>
            <Typography>Post Cooldown</Typography>
            <div
              className={`w-[53px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>
                {dailyPosts}/{totalDailyPosts}{' '}
              </Typography>
            </div>
            <Typography>Daily Posts</Typography>
          </div>
        </div> */}
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
          <div className='flex justify-center gap-5'>
            <Button
              sx={{
                ...stylesMui.suspendButton,
                '&:hover': {
                  backgroundColor: '#FF0000',
                },
              }}
            >
              Suspend
            </Button>
            <Button
              sx={{
                ...stylesMui.deleteButton,
                '&:hover': {
                  backgroundColor: '#FF0000',
                },
              }}
            >
              Block
            </Button>
            <Button
              sx={{
                ...stylesMui.accountDeleteButton,
                '&:hover': {
                  backgroundColor: '#FF0000',
                },
              }}
            >
              <Image
                src={'/Images/trash.svg'}
                alt='delete'
                width={16}
                height={16}
                style={{ paddingRight: '0.5rem' }}
              />
              Account Delete
            </Button>
          </div>
        </div>
        <div className='flex flex-col justify-center items-end gap-2 w-full mt-8'>
          <div className='flex items-center gap-2'>
            <EngagementIcon isActive={true} />
            <Typography>Engagement Complete</Typography>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className={`w-[95px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>0h 50m 0s</Typography>
            </div>
            <Typography>Post Cooldown</Typography>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className={`w-[53px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>
                {dailyPosts}/{totalDailyPosts}{' '}
              </Typography>
            </div>
            <Typography>Daily Posts</Typography>
          </div>
        </div>
        <div className='flex sm:flex-row items-center gap-2 mt-6'>
          <Button sx={{ ...stylesMui.bodyButton, width: '100%' }}>All Acocunt</Button>
          <Button onClick={handleCreatePost} sx={{ ...stylesMui.bodyButton, width: '100%' }}>
            Show All
          </Button>
        </div>
      </div>

      {userData?.data && userData?.data?.length === 0 && (
        <div className='px-6 lg:px-20 mt-10'>
          <NoPosts isAdmin={true} errorText={'Posts Not Available'} />
        </div>
      )}

      <div
        id='summary'
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-6 pt-4 lg:px-20 lg:pt-12'
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        {userData?.data && userData?.data?.length > 0 ? (
          <>
            {currentData &&
              currentData?.map((post: any, index: any) => (
                <PostCard
                  key={index}
                  isEngaged={post.isEngaged}
                  adminDeletePostId={post._id}
                  adminTweetUserId={userId}
                  isCircleView={true}
                  postLink={post.tweetId}
                  isAdmin={true}
                />
              ))}
          </>
        ) : (
          <div className='flex justify-center items-center'>
            <p className='text-[#FFC504] animate-bounce'>No Posts Available For This User</p>
          </div>
        )}
      </div>

      {userData?.data && userData?.data?.length > 8 && (
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
      <CreateModal
        firstheading='Create Post'
        secondheading='Write your post here'
        firstbutton='Cancel'
        secondbutton='Create'
        postText='Hi there!'
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default AdminAuth(CircleViewPost)
