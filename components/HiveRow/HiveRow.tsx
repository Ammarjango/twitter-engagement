'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '../styles'
import axios from 'axios'
import { toast } from 'react-toastify'
import BtnLoader from '../Loader/BtnLoader'
import useUserDetailHook from 'Hooks/UserDetaill/userDetailHook'
import * as api from '../../utils/api'
import Link from 'next/link'

interface HiveRowProps {
  hiveName: string
  completed: number
  id: number
  action: string
  link: string
  isLocked: boolean
  postCount: number
}

const HiveRow: React.FC<HiveRowProps> = ({
  hiveName,
  completed,
  id,
  action,
  link,
  isLocked,
  postCount,
}) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [loader, setLoader] = useState(false)
  const { userDetails, userLoading } = useUserDetailHook()
  const router = useRouter()

  const getToken = localStorage.getItem('loginToken')

  //////////////////////////////Join the hive ///////////////////////////

  const handleJoinCircle = async (id: any, e: any) => {
    e.preventDefault()
    try {
      setLoader(true)
      const response = await api.joinCircle(id)
      const result = response.data
      if (result.status) {
        toast.success(result.message)
        router.push(`/user/circle?id=${id}`)
      }
      setLoader(false)
      return result
    } catch (error: any) {
      setLoader(false)
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  return (
    <div
      className={`flex justify-between items-center rounded-[5px] border px-4 h-[60px] ${
        isDark
          ? 'bg-[rgba(32,29,23,0.8)] border-gray-900'
          : 'bg-[rgba(0, 0, 0, 0.8)] border-slate-950'
      } ${isLocked ? 'opacity-50' : ''}`}
      style={{
        color: theme.palette.text.primary,
        boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
        transition: 'transform 0.3s ease',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        zIndex: 1,
        backdropFilter: isDark ? '' : 'blur(2px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <Typography
        sx={{
          maxWidth: { xs: '4rem', sm: 'none' },
          fontSize: { xs: '14px', sm: '18px' },
          fontWeight: '600',
        }}
      >
        {hiveName}
      </Typography>
      <div className='flex gap-1 md:gap-4 items-center'>
        <Image src='/Images/hive.svg' alt='hive' width={39} height={35} />
        <div
          className={`w-[30px] md:w-[80px] h-[35px] rounded-[12px] border px-4  ${
            isDark ? 'bg-[#1B1507] border-[#100B0114]' : 'bg-[#FBFBFB] border-[FFFFFF14]'
          } flex justify-center items-center`}
          style={{
            border: isDark
              ? '2px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Typography sx={stylesMui.chipNumbers}>{completed}/60</Typography>
        </div>

        {getToken ? (
          <>
            {userDetails && userDetails?.data?.circleId === id ? (
              <Link href={`/user/circle?id = ${id}`}>
                <Button sx={stylesMui.bodyButton}>{userLoading ? <BtnLoader /> : 'View'}</Button>
              </Link>
            ) : (
              <Button
                disabled={userDetails?.data?.circleId}
                sx={stylesMui.bodyButton}
                onClick={(e: any) => handleJoinCircle(id, e)}
              >
                {userLoading ? <BtnLoader /> : 'Join'}
              </Button>
            )}
          </>
        ) : (
          <Button
            disabled={true}
            sx={stylesMui.bodyButton}
            onClick={(e: any) => handleJoinCircle(id, e)}
          >
            {userLoading ? <BtnLoader /> : 'Join'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default HiveRow
