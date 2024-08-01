'use client'

import { Menu, MenuItem, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { stylesChart } from './styles'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { useColorContext } from 'context/ColorContext'

const CircleEngagementChart = ({ allCircleEngagement }) => {
  const { theme } = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const isMobileScreen = useMediaQuery('(max-width: 1024px)')
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const [anchorEl, setAnchorEl] = useState(null)
  const [sortOrder, setSortOrder] = useState('Ascending')
  const [data, setData] = useState(allCircleEngagement)
  const { color } = useColorContext()

  useEffect(() => {
    const savedSortOrder = localStorage.getItem('sortOrder')
    if (savedSortOrder) {
      setSortOrder(savedSortOrder)
      sortData(savedSortOrder, allCircleEngagement)
    }
  }, [allCircleEngagement])

  const sortData = (order, data) => {
    const sortedData = [...data]
    if (order === 'Ascending') {
      sortedData.sort((a, b) => a.engagements - b.engagements)
    } else {
      sortedData.sort((a, b) => b.engagements - a.engagements)
    }
    setData(sortedData)
  }

  const handleAscOrder = (item) => {
    sortData(item, allCircleEngagement)
    setSortOrder(item)
    localStorage.setItem('sortOrder', item)
    handleCloseMenu()
  }

  const handleDescOrder = (item) => {
    sortData(item, allCircleEngagement)
    setSortOrder(item)
    localStorage.setItem('sortOrder', item)
    handleCloseMenu()
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const maxValue = Math.max(...data.map((item) => item.engagements))

  const getLabelFontSize = () => {
    if (isSmallScreen) {
      return '8px'
    } else if (isMobileScreen) {
      return '13px'
    } else {
      return '14px'
    }
  }

  return (
    <div
      className={`w-11/12 lg:w-[100%] flex flex-col justify-center items-center rounded-[16px] border p-2 ${
        isDark ? 'bg-[#201D17] border-[#FFFFFF1F]' : 'bg-white border-[#DCDCDC]'
      }`}
      style={{
        color: theme.palette.text.primary,
        boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
        zIndex: 999,
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
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
      <ResponsiveContainer width='97%' height={300}>
        <BarChart data={data} layout='vertical' barCategoryGap='none'>
          <CartesianGrid strokeDasharray='3 3' vertical={false} horizontal={false} />
          <XAxis type='number' domain={[0.001, maxValue]} axisLine={false} tick={false} />
          <YAxis type='category' dataKey='name' hide={true} />
          {/* <Legend /> */}
          <Bar dataKey='engagements' fill={color} stroke='none'>
            <LabelList
              dataKey='name'
              position='insideRight'
              style={{
                fill: 'black',
                fontSize: getLabelFontSize(),
                textAnchor: 'end',
                fontWeight: 400,
                paddingLeft: 20,
              }}
            />
            <LabelList
              dataKey='engagements'
              position='insideLeft'
              style={{ fill: 'black', fontSize: getLabelFontSize() }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(CircleEngagementChart)
