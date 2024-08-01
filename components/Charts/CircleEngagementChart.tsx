'use client'
import { Menu, MenuItem, Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

// import Chart from 'react-apexcharts'

import { stylesChart } from './styles'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const CircleEngagementChart = ({ allCircleEngagement }: any) => {
  const { theme } = useTheme()

  const [windowFlag, setWindowFlag] = useState(false)
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [sortOrder, setSortOrder] = useState<string>('Ascending')

  const handleAscOrder = (item: any) => {
    allCircleEngagement?.sort((a: any, b: any) => a.engagements - b.engagements)
    setSortOrder(item)
    handleCloseMenu()
  }

  const handleDescOrder = (item: any) => {
    allCircleEngagement?.sort((a: any, b: any) => b.engagements - a.engagements)
    setSortOrder(item)
    handleCloseMenu()
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const seriesData = [
    {
      data: allCircleEngagement?.map((item: any) => item?.engagements),
    },
  ]
  // TODO : Item bar width not applying
  const options = {
    chart: {
      type: 'bar',
      height: 380,

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#FFC504', '#ECC115', '#ECC115', '#ECC115', '#ECC115', '#ECC115'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#000'],
      },
      formatter: function (val: any, opt: any) {
        return val + ': ' + opt.w.globals.labels[opt.dataPointIndex]
      },
      offsetX: 0,
      dropShadow: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: allCircleEngagement?.map((item: any) => item?.name),
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
      grid: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return ''
          },
        },
      },
    },
    legend: {
      show: false,
    },
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowFlag(true)
    }
  }, [])

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  return (
    <div
      className={`w-11/12 lg:w-[100%] flex flex-col justify-center items-center rounded-[16px] border p-2 ${
        isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
      }`}
      style={{
        color: theme.palette.text.primary,
        boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
        zIndex: '999',
      }}
    >
      <div id='header' className='flex justify-between w-full'>
        <Typography sx={stylesChart.heading}>Hive Engagement</Typography>
        <Image
          src='/Images/dropdown.svg'
          width={38}
          height={46}
          alt='dropdown'
          onClick={handleOpenMenu}
          className='cursor-pointer'
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleAscOrder('Ascending')}>Ascending</MenuItem>
          <MenuItem onClick={() => handleDescOrder('Descending')}>Descending</MenuItem>
        </Menu>
      </div>
      <div className='w-full'>
        <Typography sx={stylesChart.subheading}>{sortOrder}</Typography>
      </div>
      <div id='chart'>
        {windowFlag ? (
          <>
            {/* @ts-ignore */}
            <Chart options={options} series={seriesData} type='bar' width={470} height={300} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}
// import { useState, useEffect } from 'react'
// const CircleEngagementChart = () => {
//   const [isClient, setIsClient] = useState(false)

//   useEffect(() => {
//     setIsClient(true)
//   }, [])
//   return <div>{isClient ? <p> 'This is never prerendered'</p> : null}</div>
// }

export default CircleEngagementChart
