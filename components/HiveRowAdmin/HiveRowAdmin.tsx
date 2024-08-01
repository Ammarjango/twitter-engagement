'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button, Typography } from '@mui/material'

import { useTheme } from '../../context/ThemeContext'
import LockIcon from '../assets/icons/LockIcon'

import { stylesMui } from '../styles'
import ConfirmModal from '../Modals/ConfimModal'

interface HiveRowAdmnProps {
  hiveName: string
  hiveId: string
  completed: number
  total: number
  firstButton: string
  secondButton: string
  link: string
  isLocked: boolean
  handleCircleListRefresh?: () => void
}

const HiveRowAdmn: React.FC<HiveRowAdmnProps> = ({
  hiveName,
  completed,
  total,
  firstButton,
  secondButton,
  link,
  isLocked,
  hiveId,
  handleCircleListRefresh,
}) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleViewButtonClick = () => {
    const path = `/admin/circleView?circleId=${hiveId}`
    router.push(path)
  }
  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true)
  }

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  return (
    <>
      <div
        className={`flex justify-between items-center rounded-[5px] border px-4 h-[60px] ${
          isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
        } ${isLocked ? 'opacity-50' : ''}`}
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
        <Typography
          className='font-roboto font-semibold'
          sx={{ maxWidth: { xs: '4rem', sm: 'none' }, fontSize: { xs: '14px', sm: '16px' } }}
        >
          {hiveName}
        </Typography>
        <div className='flex sm:gap-1 ,gap-4 items-center'>
          <Image src='/Images/hive.svg' alt='hive' width={39} height={35} />
          <div
            className={`w-[10%] md:w-[80px] h-[35px] rounded-[12px] border px-4 mx-1 lg:mx-4 ${
              isDark
                ? 'bg-[#1B1507] border-[1px_solid_rgba(255, 255, 255, 0.12)]'
                : 'bg-[#FBFBFB] border-[1px_solid_rgba(0, 0, 0, 0.12)]'
            } flex justify-center items-center`}
            style={{
              border: isDark
                ? '2px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Typography sx={{ ...stylesMui.chipNumbers, width: { xs: '1.5rem', sm: '2rem' } }}>
              {completed}/{total}
            </Typography>
          </div>
          <div className='flex gap-2 lg:gap-5'>
            {isLocked ? (
              <div className='flex justify-center w-[60px]'>
                <LockIcon isDark={isDark} />
              </div>
            ) : (
              <Button
                sx={stylesMui.bodyButton}
                style={{ minWidth: '45px', width: '70px', fontSize: '12px', maxWidth: '10vw' }}
                onClick={handleViewButtonClick}
              >
                {firstButton}
              </Button>
            )}
            <Button
              sx={{ ...stylesMui.deleteButton }}
              style={{ minWidth: '45px', width: '70px', fontSize: '12px', maxWidth: '10vw' }}
              onClick={handleDeleteButtonClick}
            >
              {secondButton}
            </Button>
          </div>
        </div>
      </div>
      <ConfirmModal
        firstheading=''
        secondheading='Are you sure you want to delete this Hive?'
        firstbutton='Cancel'
        secondbutton='Delete'
        isDeleteCircle={true}
        isOpen={isDeleteModalOpen}
        circleId={hiveId}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleCircleListRefresh={() => handleCircleListRefresh && handleCircleListRefresh()}
      />
    </>
  )
}

export default HiveRowAdmn
