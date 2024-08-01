'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button, Typography } from '@mui/material'
import * as api from '../../utils/api'
import { useTheme } from 'context/ThemeContext'
import EngagementIcon from '../assets/icons/EngagementIcon'

import { stylesMui } from '../styles'
import ConfirmModal from '../Modals/ConfimModal'
import ViewPostModal from '../Modals/ViewPostModal'
import useUserDetailHook from 'Hooks/UserDetaill/userDetailHook'

interface PostCardProps {
  isEngaged: boolean
  isAdmin?: boolean
  isCircleView?: boolean
  engageUsers?: any
  engageUserIdComment?: any
  engageUserTweet?: any
  postLink?: any
  adminTweetUserId?: any
  adminDeletePostId?: any
  userView?: boolean
}

const PostCard: React.FC<PostCardProps> = ({
  isEngaged,
  postLink,
  engageUsers,
  engageUserIdComment,
  engageUserTweet,
  isCircleView,
  isAdmin = false,
  adminTweetUserId,
  adminDeletePostId,
  userView,
}) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tweetId, setTweetId] = useState<any>('')
  const { userDetails } = useUserDetailHook()

  const [tweetData, setTweetData] = useState()
  const router = useRouter()

  const loginToken = typeof window !== 'undefined' ? localStorage.getItem('loginToken') || '' : ''
  const fetchData = async () => {
    try {
      if (tweetId) {
        const response = await api.getPostTweet(tweetId)
        setTweetData(response.data)
        return response.data
      }
    } catch (error: any) {
      console.log('error getting tweet data', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [loginToken])

  const handleDeletePost = () => {
    setIsDeleteModalOpen(true)
  }

  const handleViewPost = (id: any) => {
    setIsModalOpen(true)
    setTweetId(id)
  }

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  const tweetUserId = userDetails && userDetails?.data?.userData[0]?._id

  // const checkTweet =
  //   engageUsers?.includes(tweetUserId) &&
  //   engageUserIdComment?.includes(tweetUserId) &&
  //   engageUserTweet?.includes(tweetUserId)

  const checkTweet = engageUsers?.includes(tweetUserId)

  const likedTweet = engageUsers?.includes(tweetUserId)
  const retweetedTweet = engageUserTweet?.includes(tweetUserId)
  const commentedTweet = engageUserIdComment?.includes(tweetUserId)

  return (
    <div
      className={`flex flex-col justify-center items-center z-10 gap-2 rounded-[5px] p-[0.5rem] border h-fit lg:h-[140px]`}
      style={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.primary,
        boxShadow: isDark ? '0px 0px 32px 0px #2C32A90A' : '0px 0px 15px 0px #3E3E3E1A',
        transition: 'transform 0.3s ease',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <div className='flex flex-col justify-center items-center gap-[0.7vw] px-0 py-5 lg:flex-row lg:justify-center lg:items-center'>
        <EngagementIcon isActive={checkTweet} />
        <Typography sx={{ ...stylesMui.h3, fontSize: { xs: '12px', sm: '16px' } }}>
          Engagement {checkTweet && checkTweet ? 'Complete' : 'UnComplete'}
        </Typography>
      </div>
      {isCircleView ? (
        <div id='actions' className='flex justify-end gap-1 sm:gap-2 px-5'>
          <Button onClick={() => handleViewPost(postLink)} sx={stylesMui.bodyButton}>
            View Post
          </Button>
          <Button
            onClick={handleDeletePost}
            sx={{
              // ...(isAdmin ? stylesMui.deleteButton : stylesMui.bodyButton), // Commented out because it might be needed later for user side post deletion
              ...stylesMui.deleteButton,
              height: '36px',
              '&:hover': {
                backgroundColor: '#FF0000',
              },
            }}
            style={{
              width: '42px',
              minWidth: '5%',
            }}
          >
            <Image
              src={isAdmin ? '/Images/trash.svg' : '/Images/trashIcon.svg'}
              alt='delete'
              width={16}
              height={16}
            />
          </Button>
        </div>
      ) : (
        <Button onClick={() => handleViewPost(postLink)} sx={stylesMui.bodyButton}>
          View Post
        </Button>
      )}
      <ConfirmModal
        firstheading=''
        secondheading='Do you want to delete this post?'
        firstbutton='Cancel'
        secondbutton='Delete'
        isOpen={isDeleteModalOpen}
        isDeletePost={true}
        handleClose={() => setIsDeleteModalOpen(false)}
        tweetId={adminDeletePostId}
      />

      <ViewPostModal
        firstheading='Post'
        secondheading='Link'
        firstbutton='Retweet'
        secondbutton='Like'
        postText='Hi there!'
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        tweetId={tweetId}
        likedTweet={likedTweet}
        reTweeted={retweetedTweet}
        addedComments={commentedTweet}
        adminViewPost={isCircleView}
        tweetUserId={adminTweetUserId}
        userView={userView}
      />
    </div>
  )
}

export default PostCard
