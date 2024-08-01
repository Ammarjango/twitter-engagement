'use client'
import React from 'react'

import { Button, ButtonGroup, Typography } from '@mui/material'

import TableRow from './TableRow'
import { stylesMui } from '@/components/styles'
import Loader from '../Loader/Loader'
import useUserDetailHook from 'Hooks/UserDetaill/userDetailHook'
import { useColorContext } from 'context/ColorContext'

interface Props {
  pointsData: any
  loading: boolean
  RefferalPoints: number
  ReferalEngagment: number
}

const PositionPointsTable = ({ pointsData, loading, RefferalPoints, ReferalEngagment }: Props) => {
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  return (
    <>
      <div id='heading' className='flex justify-between'>
        <Typography sx={{ ...stylesMui.h2, fontSize: { xs: '4vw', sm: '24px' } }}>
          User Position Points
        </Typography>
        {/* <ButtonGroup disableElevation variant='contained' aria-label='Disabled button group'>
          <Button sx={{ backgroundColor: '#FFC504', color: '#000' }}>
            <Typography sx={stylesMui.h5}>Epoch</Typography>
          </Button>
          <Button sx={{ backgroundColor: '#000', color: '#fff' }}>
            <Typography sx={stylesMui.h5}>All Time</Typography>
          </Button>
        </ButtonGroup> */}
      </div>

      <div id='table' className='mt-6 lg:mt-8'>
        <div
          id='users-table-columns'
          className='grid grid-cols-6 gap-6 rounded-[5px] h-[60px]'
          style={{ backgroundColor: `${color}` }}
        >
          <Typography
            sx={{ ...stylesMui.h7, color: '#000' }}
            className='col-span-2 flex items-center justify-center'
          >
            Position
          </Typography>
          <Typography
            sx={{ ...stylesMui.h7, color: '#000' }}
            className='col-span-2 flex items-center justify-center'
          >
            User
          </Typography>
          <Typography
            sx={{ ...stylesMui.h7, color: '#000' }}
            className='col-span-2 flex items-center justify-center'
          >
            Points
          </Typography>
        </div>
        {loading ? (
          <div className='flex justify-center items-center h-[30vh] w-full'>
            <Loader />
          </div>
        ) : (
          <>
            {pointsData &&
              pointsData
                .sort((a: any, b: any) => b.totalValue - a.totalValue)
                .map((user: any, index: number) => (
                  <TableRow
                    key={index}
                    position={index + 1}
                    user={user.username}
                    points={user.totalValue + RefferalPoints + ReferalEngagment}
                  />
                ))}
          </>
        )}
      </div>
    </>
  )
}

export default PositionPointsTable
