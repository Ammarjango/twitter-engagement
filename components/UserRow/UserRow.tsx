'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button, Typography, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTheme } from 'context/ThemeContext'

import { stylesMui } from '../styles'
const ConfirmModal = dynamic(() => import('../Modals/ConfimModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

interface UserRowProps {
  userName?: string
  userId?: string
  circleId?: string
  accountName?: string
  email?: string
  status?: string
  completed?: number
  total?: number
  isSuspended?: boolean
  isBlocked?: boolean
  isDeleted?: boolean
  isMobileScreen?: boolean
  isAdminRow?: boolean
  noOfPosts?: number
  userPosts?: any
  handleAdminUserListRefresh?: () => void
}

const UserRow: React.FC<UserRowProps> = ({
  userName,
  userId,
  circleId,
  accountName,
  email,
  status,
  completed,
  total,
  isSuspended,
  isBlocked,
  isDeleted,
  isMobileScreen,
  isAdminRow,
  noOfPosts,
  userPosts,
  handleAdminUserListRefresh,
}) => {
  const { theme } = useTheme()

  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [secondButton, setSecondButton] = useState('')
  const [modalHeading, setModalHeadingButton] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  const handleViewClick = () => {
    if (isAdminRow === true) {
      const userPostsEncoded = encodeURIComponent(JSON.stringify(userPosts))
      const url = `admin/circleVisitPost?userName=${userName}&noOfPosts=${noOfPosts}&circleId=${circleId}&userId=${userId}&userPosts=${userPostsEncoded}`
      router.push(url)
    }
  }

  const handleSuspendUser = () => {
    const newSecondButton = isSuspended === true ? 'Resume' : 'Suspend'
    setSecondButton(newSecondButton)
    const newModalHeading =
      isSuspended !== true
        ? 'Are you sure you want to Suspend this user?'
        : 'Are you sure you want to Resume this user?'

    setModalHeadingButton(newModalHeading)
    setIsModalOpen(true)
  }

  const handleBlockUser = (e: any) => {
    e.preventDefault()
    const newSecondButton = isBlocked === true ? 'UnBlock' : 'Block'
    setSecondButton(newSecondButton)

    const newModalHeading =
      isBlocked !== true
        ? 'Are you sure you want to Block this user?'
        : 'Are you sure you want to unblock this user?'

    setModalHeadingButton(newModalHeading)
    setIsModalOpen(true)
  }

  const handleDeleleUser = () => {
    const newSecondButton = isDeleted === true ? 'Restore' : 'Delete'
    setSecondButton(newSecondButton)

    const newModalHeading =
      isDeleted === false
        ? 'Are you sure you want to delete this user?'
        : 'Are you sure you want to restore this user?'

    setModalHeadingButton(newModalHeading)
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        className={`flex justify-between items-center rounded-[5px] border px-4 py-4 lg:py-0 lg:h-[60px] ${
          isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
        } ${isBlocked ? `${isDark ? 'opacity-75 bg-[#FF000033]' : ' bg-[#ffb6b6]'}` : ''}`}
        style={{
          color: theme.palette.text.primary,
          boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
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
        {isMobileScreen ? (
          <div id='mobile-card' className='flex flex-col justify-center w-full'>
            <div id='header-card' className='flex justify-between' style={{ marginBottom: '4rem' }}>
              <Image src='/Images/hive.svg' alt='hive' width={39} height={35} />
              <div className='flex gap-2'>
                {/* <div
                className={`w-[80px] h-[35px] rounded-[12px] border px-4 ${
                  isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
                } flex justify-center items-center`}
              >
                <Typography sx={stylesMui.chipNumbers}>
                  {completed}/{total}
                </Typography>
              </div> */}
                <Button
                  onClick={handleDeleleUser}
                  sx={{
                    ...stylesMui.bodyButton,
                    //  TODO: width not applying
                    width: '48px',
                    backgroundColor: '#000!important',
                    height: '34px',
                    '&:hover': {
                      backgroundColor: '#FF0000',
                    },
                  }}
                >
                  <Image src='/Images/trash.svg' alt='delete' width={16} height={16} />
                </Button>
              </div>
            </div>
            <div id='body-card' className='space-y-3 '>
              <div
                className={`flex justify-between border border-b-2 ${
                  isDark ? 'border-[#ffffff]' : 'border-[#181717]'
                }`}
                style={{ borderBottom: isDark ? '2px solid #37332e' : '2px solid #E6E6E6' }}
              >
                <Typography className='text-[20px] font-roboto font-semibold'>
                  User Name:
                </Typography>
                <Typography className='text-[20px] font-roboto font-semibold'>
                  {userName}
                </Typography>
              </div>
              <div
                className={`flex justify-between border border-b-2`}
                style={{ borderBottom: isDark ? '2px solid #37332e' : '2px solid #E6E6E6' }}
              >
                <Typography className='text-[20px] font-roboto font-semibold'>Hive Name</Typography>
                <Typography className='text-[20px] font-roboto font-semibold'>
                  {accountName}
                </Typography>
              </div>
              <div
                className={`flex justify-between border border-b-2`}
                style={{ borderBottom: isDark ? '2px solid #37332e' : '2px solid #E6E6E6' }}
              >
                <Typography className='text-[20px] font-roboto font-semibold'>Email</Typography>
                <Typography className='text-[20px] font-roboto font-semibold'>
                  {email || 'NA'}
                </Typography>
              </div>
              <div
                className={`flex justify-between border border-b-2`}
                style={{ borderBottom: isDark ? '2px solid #37332e' : '2px solid #E6E6E6' }}
              >
                <Typography className='text-[20px] font-roboto font-semibold'>Status</Typography>
                <Typography className='text-[20px] font-roboto font-semibold'>{status}</Typography>
              </div>
            </div>
            <div id='footer-card' className='flex justify-center gap-4 items-center mt-5'>
              <Button
                onClick={() => {
                  handleViewClick()
                }}
                sx={{ ...stylesMui.bodyButton, width: '5rem' }}
              >
                View
              </Button>
              <Button
                onClick={handleSuspendUser}
                sx={{
                  ...stylesMui.bodyButton,
                  backgroundColor: '#D87C0E!important',
                  color: '#fff',
                  width: '5rem',
                }}
              >
                {isSuspended ? 'Resume' : 'Suspend'}
              </Button>
              <Button
                onClick={(e: any) => handleBlockUser(e)}
                sx={{
                  ...stylesMui.bodyButton,
                  backgroundColor: '#FF0000!important',
                  color: '#fff',
                  width: '5rem',
                }}
              >
                {isBlocked ? 'Unblock' : 'Block'}
              </Button>
            </div>
          </div>
        ) : (
          <div
            id='users-table-columns'
            className='flex justify-between w-[100%] rounded-[5px] h-[60px] items-center'
            // className='grid grid-cols-6 rounded-[5px] h-[60px] items-center overflow-hidden'
          >
            <div className='flex justify-between items-center w-[57%]'>
              <Typography className='flex items-center  w-[25%] font-roboto font-semibold'>
                {userName}
              </Typography>
              <Typography className='flex items-center justify-center w-[25%] font-roboto font-semibold'>
                {accountName}
              </Typography>
              <Typography className='flex items-center justify-center w-[25%] font-roboto font-semibold'>
                {email || 'NA'}
              </Typography>
              <Typography className='flex items-center justify-center w-[25%] font-roboto font-semibold'>
                {status || 'Active'}
              </Typography>
            </div>
            <div className='col-span-2 flex justify-end items-center gap-5 bg-none w-[30%]'>
              <Image src='/Images/hive.svg' alt='hive' width={45} height={45} />
              <Button
                onClick={() => {
                  handleViewClick()
                }}
                sx={{ ...stylesMui.bodyButton, padding: '10px 30px' }}
              >
                View
              </Button>
              <Button
                onClick={handleSuspendUser}
                sx={{
                  ...stylesMui.bodyButton,
                  backgroundColor: '#D87C0E!important',
                  padding: '10px 30px',
                }}
              >
                {isSuspended ? 'Resume' : 'Suspend'}
              </Button>
              <Button
                onClick={(e: any) => handleBlockUser(e)}
                sx={{
                  ...stylesMui.bodyButton,
                  backgroundColor: '#FF0000!important',
                  padding: '10px 30px',
                }}
              >
                {isBlocked ? 'Unblock' : 'Block'}
              </Button>
              <Button
                onClick={handleDeleleUser}
                sx={{
                  ...stylesMui.bodyButton,
                  // width: '48px',
                  backgroundColor: '#000!important',
                  padding: '10px 30px',
                  height: '34px',
                  '&:hover': {
                    backgroundColor: '#FF0000',
                  },
                }}
              >
                <Image src='/Images/trash.svg' alt='delete' width={16} height={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        firstheading=''
        secondheading={modalHeading}
        firstbutton='Cancel'
        secondbutton={secondButton}
        isOpen={isModalOpen}
        userId={userId}
        handleClose={() => setIsModalOpen(false)}
        handleAdminUserListRefresh={handleAdminUserListRefresh}
      />
    </>
  )
}

export default UserRow
