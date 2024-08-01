'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { useTheme } from 'context/ThemeContext'

import PostCard from '@/components/PostCard/PostCard'
import Pagination from '@/components/Pagination'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateHref } from 'utils/generateHref'
import EngagementIcon from '@/components/assets/icons/EngagementIcon'
import NoPosts from '@/components/NoPosts'
import * as api from '../../../utils/api'
import { stylesMui } from '@/components/styles'
import CreateModal from '@/components/Modals/CreateModal'
import AirDropModal from '@/components/Modals/AirDropModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import BtnLoader from '@/components/Loader/BtnLoader'
import Loader from '@/components/Loader/Loader'
import useUserDetailHook from 'Hooks/UserDetaill/userDetailHook'
import ProtectedRoutes from '../ProtectedRoutes'

// TODO: remove default set for the props from homepage linking
const Circle = () => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [leaveCircleLoader, setLeaveCircleLoader] = useState(false)
  const [circleId, setCircleId] = useState('')
  const [postData, setPostData] = useState<any>('')
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const itemsPerPage = 8

  const totalPages = Math.ceil(postData && postData?.posts.length / itemsPerPage)

  const currentData =
    postData && postData?.posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  const router = useRouter()

  const { userDetails, userLoading } = useUserDetailHook()

  useEffect(() => {
    searchParams.forEach((value, key) => {
      const trimValue = value.trim()
      setCircleId(trimValue)
    })
  }, [searchParams])

  const hiveName = 'Gaming Hive'
  const dailyPosts = 2
  const totalDailyPosts = 4

  const getToken = localStorage.getItem('loginToken') || ''

  const action = () => {
    const path = '/'
    router.push(path)
  }

  // //////////////////////////////////////////////Leave the circle///////////////////////////
  const LevaeCircle = async (e: any) => {
    e.preventDefault()
    try {
      setLeaveCircleLoader(true)
      if (circleId) {
        const response = await api.LeaveCircle(circleId)
        const result = response.data
        setLeaveCircleLoader(false)
        if (result.status) {
          toast.success(result.message)
        }
        action()
        return result
      }
    } catch (error: any) {
      setLeaveCircleLoader(false)
      toast.error(error.response.data.message)
    }
  }

  // ///////////////////////////////////////////////Getting all Posts of the circle///////////////////////////////////////////
  const getPosts = async () => {
    try {
      setLoading(true)
      if (circleId) {
        const response = await api.allPostOfCircle(circleId)
        setPostData(response.data)
        setLoading(false)
        return response.data
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [circleId])

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
  const handleVerifyEngagement = () => {
    setIsVerifyModalOpen(true)
  }

  const postsCount = postData && postData?.posts.length

  const userDetailsEngagementLikedTweets =
    userDetails?.data?.userData[0]?.engagement?.likedTweets || []
  const postDataPosts = postData?.posts || []

  const matchingLikeTweetIds = postDataPosts.filter((post: any) =>
    userDetailsEngagementLikedTweets.includes(post.tweetId),
  )

  // ///////////////////For Comments Ids//////////////////
  const userCommentIds = userDetails?.data?.userData[0]?._id || []
  const matchingCommentIds = postDataPosts.filter((post: any) =>
    post.engageUserIdComment.includes(userCommentIds),
  )

  const userRetweetIds = userDetails?.data?.userData[0]?._id || []
  const matchingRetweetIds = postDataPosts.filter((post: any) =>
    post.engageUserTweet.includes(userRetweetIds),
  )

  ///////////////////////////Flags to Check if All the Posts are Engaged///////////////////////

  const hasMatchingLikedIds = matchingLikeTweetIds?.length === postData?.posts?.length
  const hasMatchCommentId = matchingCommentIds?.length === postData?.posts?.length
  const hasMatchRetweetId = matchingRetweetIds?.length === postData?.posts?.length
  const hasMatchingIds = hasMatchingLikedIds

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
        <Typography sx={stylesMui.h1}>{postData && postData.circleName}</Typography>
        <div className='flex gap-2'>
          {/* <Button onClick={handleVerifyEngagement} sx={stylesMui.bodyButton}>
            Verify Engagement
          </Button> */}
          <Button
            onClick={(e) => LevaeCircle(e)}
            sx={{
              ...stylesMui.bodyButton,
              '&:hover': {
                backgroundColor: '#FF0000',
              },
            }}
          >
            {leaveCircleLoader ? <BtnLoader /> : 'Leave Hive'}
          </Button>
        </div>
        <div className='flex justify-between items-center gap-2 w-full mt-16'>
          {postsCount === 0 ? (
            <Button onClick={handleCreatePost} sx={{ ...stylesMui.bodyButton, px: '2rem' }}>
              + Create new post
            </Button>
          ) : (
            <Button
              disabled={!hasMatchingIds}
              onClick={handleCreatePost}
              sx={{ ...stylesMui.bodyButton, px: '2rem' }}
            >
              + Create new post
            </Button>
          )}
          <div className='flex items-center justify-end gap-8 w-full'>
            <EngagementIcon isActive={hasMatchingIds} />
            <Typography>
              {hasMatchingIds ? 'Engagement Complete' : 'Engagement UnComplete'}
            </Typography>
            {/* <div
              className={`w-[95px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>0h 50m 0s</Typography>
            </div> */}
            {/* <Typography>Post Cooldown</Typography> */}
            {/* <div
              className={`w-[53px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>
                {dailyPosts}/{totalDailyPosts}{' '}
              </Typography>
            </div> */}
            {/* <Typography>Daily Posts</Typography> */}
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
        <div className='flex justify-between'>
          <Typography sx={stylesMui.h1}>{hiveName}</Typography>
          <Button
            sx={{
              ...stylesMui.bodyButton,
              '&:hover': {
                backgroundColor: '#FF0000',
              },
            }}
          >
            Leave Hive
          </Button>
        </div>
        <div className='flex flex-col justify-center items-end gap-2 w-full mt-8'>
          <div className='flex items-center gap-2'>
            <EngagementIcon isActive={hasMatchingIds} />
            <Typography>Engagement Complete</Typography>
          </div>
          {/* <div className='flex items-center gap-2'>
            <div
              className={`w-[95px] h-[32px] rounded-[12px] border px-4 ${
                isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
              } flex justify-center items-center`}
            >
              <Typography sx={stylesMui.chipNumbers}>0h 50m 0s</Typography>
            </div>
            <Typography>Post Cooldown</Typography>
          </div> */}
          {/* <div className='flex items-center gap-2'>
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
          </div> */}
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-2 mt-6'>
          {/* <Button onClick={handleVerifyEngagement} sx={{ ...stylesMui.bodyButton, width: '100%' }}>
            Verify Engagement
          </Button> */}
          {postsCount === 0 ? (
            <Button onClick={handleCreatePost} sx={{ ...stylesMui.bodyButton, width: '100%' }}>
              + Create new post
            </Button>
          ) : (
            <Button
              disabled={!hasMatchingIds}
              onClick={handleCreatePost}
              sx={{ ...stylesMui.bodyButton, width: '100%' }}
            >
              + Create new post
            </Button>
          )}
        </div>
      </div>

      {postData && postData?.posts.length === 0 && (
        <div className='px-6 lg:px-20 mt-10'>
          <NoPosts />
        </div>
      )}

      {loading ? (
        <div className='flex flex-col flex-nowrap gap-2 px-6 pt-4 lg:px-20 lg:pt-12 h-[10rem] w-full  justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div
          id='summary'
          className={`${
            postData && postData?.posts.length < 0
              ? 'flex justify-center w-full'
              : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }   gap-2 md:gap-4 px-6 pt-4 lg:px-20 lg:pt-12`}
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          {postData && postData?.posts.length > 0 ? (
            <>
              {currentData &&
                currentData.map((post: any, index: number) => (
                  <PostCard
                    key={index}
                    isEngaged={post.isEngaged}
                    postLink={post._id}
                    engageUsers={post.engageUsers}
                    engageUserIdComment={post.engageUserIdComment}
                    engageUserTweet={post.engageUserTweet}
                    userView={true}
                  />
                ))}
            </>
          ) : (
            <div className='w-full h-[50vh]  flex justify-center items-center'>
              <p className='text-[#FFC504] animate-bounce'>No Posts Available</p>
            </div>
          )}
        </div>
      )}

      {postData && postData?.posts.length > 8 && (
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
        circleId={circleId}
      />
      <AirDropModal
        firstheading='Airdrop'
        secondheading='Points are airdropped every week. View our points page to see how your points rank against others.'
        firstbutton='Close'
        secondbutton='View Points'
        isOpen={isVerifyModalOpen}
        handleClose={() => setIsVerifyModalOpen(false)}
      />
    </div>
  )
}

export default ProtectedRoutes(Circle)
