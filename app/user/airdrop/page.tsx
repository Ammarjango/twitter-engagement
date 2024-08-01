'use client'
import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import { CategoryCard } from '@/components/Cards'
import * as api from '../../../utils/api'
import { stylesMui } from '@/components/styles'
import PositionPointsTable from '@/components/PositionPointsTable'
import axios from 'axios'
import useUserDetailHook from 'Hooks/UserDetaill/userDetailHook'
import ProtectedRoutes from '../ProtectedRoutes'
import { useColorContext } from 'context/ColorContext'

const Airdrop = () => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [pointsData, setPointsData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [postData, setPostData] = useState<any>()
  const { userLoading, userDetails } = useUserDetailHook()
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const circleId = userDetails && userDetails?.data?.circleId

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

  const tweetIdArray = [postData?.posts]

  const isEngagement =
    userDetails &&
    userDetails?.data?.userData[0]?.engagement?.likedTweets?.includes(
      postData?.posts?.map((tweet: any) => {
        tweet.tweetId
      }),
    ) &&
    userDetails?.data?.userData[0]?.engagement?.retweetTweets?.includes(
      postData?.posts?.map((tweet: any) => {
        tweet.tweetId
      }),
    ) &&
    userDetails?.data?.userData[0]?.engagement?.commentTweets?.includes(
      postData?.posts?.map((tweet: any) => {
        tweet.tweetId
      }),
    )
  const likeValues = userDetails?.data?.userData[0]?.engagement?.likeValues ?? 0
  const commentValues = userDetails?.data?.userData[0]?.engagement?.commentValues ?? 0
  const retweetValues = userDetails?.data?.userData[0]?.engagement?.retweetValues ?? 0
  const postsValues = userDetails?.data?.userData[0]?.createTweetValues ?? 0
  const ReferalEngagment = userDetails?.data?.userData[0]?.referralEngagement ?? 0
  const RefferalPoints = userDetails?.data?.userData[0]?.referralPoint ?? 0

  let engagementValues = likeValues + commentValues + retweetValues

  const categoryCardData = [
    {
      amount: userLoading ? (
        <p className={`font-light text-xs text-${color}`}>Loading...</p>
      ) : (
        engagementValues
      ),
      title: 'Engagement',
      description: 'Earn points for engaging with posts.',
    },
    {
      amount: userLoading ? (
        <p className={`font-light text-xs text-${color}`}>Loading...</p>
      ) : (
        postsValues
      ),
      title: 'Posts',
      description: 'Earn points by posting to the platform.',
    },
    {
      amount: userLoading ? (
        <p className={`font-light text-xs text-${color}`}>Loading...</p>
      ) : (
        RefferalPoints
      ),
      title: 'Referrals',
      description: 'Refer friends and earn points when they sign up and use the platform.',
    },
    {
      amount: userLoading ? (
        <p className={`font-light text-xs text-${color}`}>Loading...</p>
      ) : (
        ReferalEngagment
      ),
      title: 'Referral Engagement',
      description: 'Earn points when your referrals remain active and use the platform.',
    },
  ]

  // /////////////////////////////////////Get Circles//////////////////////
  const getCircles = async () => {
    try {
      setLoading(true)
      const response = await api.getPoints()
      setPointsData(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCircles()
  }, [])

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  const pointsCount =
    (userDetails?.data?.userData[0]?.createTweetValues ?? 0) +
    (userDetails?.data?.userData[0]?.engagement?.likeValues ?? 0) +
    (userDetails?.data?.userData[0]?.engagement?.commentValues ?? 0) +
    (userDetails?.data?.userData[0]?.engagement?.retweetValues ?? 0) +
    (ReferalEngagment ?? 0) +
    (RefferalPoints ?? 0)

  return (
    <div
      id='wrapper'
      className='min-h-screen px-6 pt-6 lg:px-20 lg:pt-8'
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div id='header' className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-2 mb-10'>
        <div className='flex flex-col gap-2 lg:gap-2'>
          <Typography sx={stylesMui.h1}>Pollen Loyalty Points</Typography>
        </div>
        {/* <div className='flex flex-col gap-4 lg:gap-3'>
          <Typography sx={stylesMui.h4}>Next airdrop in</Typography>
          <Typography sx={stylesMui.airdropCountdown}>115 : 02 : 58</Typography>
        </div> */}
      </div>

      <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
        <div id='position-points' className='w-full lg:w-1/2'>
          <PositionPointsTable
            pointsData={pointsData}
            loading={loading}
            RefferalPoints={RefferalPoints}
            ReferalEngagment={ReferalEngagment}
          />
        </div>

        <div id='points-breakdown' className='w-full lg:w-1/2 lg:mt-[85px]'>
          <div
            id='outer-card'
            className={`rounded-[5px] border py-2 px-2 lg:py-8 lg:px-6 ${
              isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
            }`}
            style={{
              color: theme.palette.text.primary,
              boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
              transition: 'transform 0.3s ease',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Typography sx={stylesMui.h2}>Your Points Breakdown</Typography>
            <Typography>
              Your all-time points. Earn points by engaging, posting, and referring friends.
            </Typography>
            <div className='flex mt-2'>
              <Typography sx={stylesMui.h2}>Total Points : </Typography>
              <Typography sx={{ ...stylesMui.h2, color: `${color}`, marginLeft: '0.5rem' }}>
                {' '}
                {pointsCount}
              </Typography>
            </div>
            <div id='inner-cards' className='grid grid-cols-2 gap-1 md:gap-4 mt-6 lg:mt-8'>
              {categoryCardData.map((data, index) => (
                <div key={index} className='col-span-1'>
                  <CategoryCard
                    amount={data.amount}
                    title={data.title}
                    description={data.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectedRoutes(Airdrop)
