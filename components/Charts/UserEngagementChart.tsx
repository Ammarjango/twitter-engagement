'use client'
import { Typography } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import React, { useState, useEffect } from 'react'
//@ts-ignore
// import Chart from 'react-apexcharts'

import { stylesChart } from './styles'
import styles from './styles.module.css'

import dynamic from 'next/dynamic'
import { useColorContext } from 'context/ColorContext'

const Chart = dynamic(() => import('react-apexcharts'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

interface UserEngagementProps {
  allEngagementUsers: any
  allUsers: any
  percentage: any
}

const UserEngagementChart: React.FC<UserEngagementProps> = ({
  allEngagementUsers,
  allUsers,
  percentage,
}) => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const [windowFlag, setWindowFlag] = useState(false)
  const { color } = useColorContext()

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: isDark ? '#94A3B3' : 'black',
              fontSize: '17px',
            },
            value: {
              color: isDark ? '#94A3B3' : 'black',
              fontSize: '42px',
              show: true,
            },
          },
          track: {
            background: '#d1d1d1', // Change the track color here to red
            strokeWidth: '97%', // Adjust track thickness
            margin: 5, // Margin between each track
          },
        },
      },
      fill: {
        colors: [`${color}`, '#fff', '#000'],
      },
      labels: ['USER ENGAGEMENT'],
    },
    series: [percentage],
  })

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowFlag(true)
    }
  }, [])

  // Update chartData when dark mode changes
  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      options: {
        ...prevChartData.options,
        fill: {
          colors: [`${color}`, isDark ? '#fff' : '#000'],
        },
        colors: [isDark ? '#fff' : '#000'],
      },
    }))
  }, [isDark])

  return (
    <div
      className={`w-11/12 lg:w-[100%] flex flex-col justify-center items-center rounded-[16px] border p-2 ${
        isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
      }`}
      style={{
        color: theme.palette.text.primary,
        boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <div id='header' className='flex justify-between w-full'>
        <Typography sx={stylesChart.heading}>Total User Engagement</Typography>
        <Typography sx={{ ...stylesChart.heading, color: `${color}` }}>
          {allEngagementUsers}/{allUsers}
        </Typography>
      </div>
      <div className='w-full'>
        <Typography sx={stylesChart.subheading}>Statistics Subinformation</Typography>
      </div>
      <div id='chart'>
        {windowFlag && (
          <>
            <Chart
              //  @ts-ignore
              options={chartData.options}
              series={chartData.series}
              type='radialBar'
              height={350}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default UserEngagementChart
