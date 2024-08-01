'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Typography, Stack, Grid, Button, TextField } from '@mui/material'
import { useTheme } from '../../context/ThemeContext'
import { stylesMui } from '@/components/styles'
import HiveRowAdmin from '@/components/HiveRowAdmin/HiveRowAdmin'
import Pagination from '@/components/Pagination'
import axios from 'axios'
import CreateModal from '../Modals/CreateModal'
import AdminAuth from 'app/admin/AdminAuth'
import Loader from '../Loader/Loader'

const AdminCircle = () => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [circleData, setCircleData] = useState<any>()
  const [isAddCircleModalOpen, setIsAddCircleModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [getToken, setGetToken] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 9

  useEffect(() => {
    const savedValue = window.localStorage.getItem('admin_access_token')
    setGetToken(savedValue || '')
  }, [])

  const router = useRouter()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/get/circles`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      setCircleData(response.data)
      setLoading(false)
    } catch (error: any) {
      console.error(error)
      setLoading(false)
    }
  }

  let circleDetails: any = []

  if (circleData && Array.isArray(circleData?.circle)) {
    circleDetails = circleData?.circle.map((circle: any) => {
      return {
        name: circle?.name,
        circleId: circle?._id,
        members: circle?.members,
        posts: circle?.posts,
        noOfUsers: circle?.members?.length,
      }
    })
  }

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  const handleAddCircleClick = () => {
    setIsAddCircleModalOpen(true)
  }

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const filteredCircle =
    circleDetails &&
    circleDetails
      .filter(
        (hive: any) =>
          hive?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hive?.circleId?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .reverse()

  const totalCircles = filteredCircle.length
  const totalPages = Math.ceil(totalCircles / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const currentData = filteredCircle.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  useEffect(() => {
    if (getToken) {
      fetchData()
    }
  }, [getToken])

  return (
    <>
      <div
        id='wrapper'
        className='min-h-screen'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div id='hero-desktop' className='hidden lg:flex lg:justify-between px-20 pt-8'>
          <div className='rounded-[12px] border flex justify-between items-center w-full gap-4'>
            <div className='flex justify-start items-center'>
              <Typography sx={stylesMui.h1}>Hive</Typography>
            </div>
            <div className='flex items-center gap-4'>
              <div
                id='search'
                className='flex justify-end items-center gap-1 bg-none placeholder-slate-600 h-[9vh]'
              >
                <TextField
                  sx={{ border: 'none', '& fieldset': { border: 'none' } }}
                  style={{
                    borderRadius: '12px',
                    backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                    height: '3rem',
                    border: 'none',
                    width: '100%',
                  }}
                  placeholder='Type here...'
                  onChange={handleSearchChange}
                  value={searchTerm}
                />
                <Button className='ml-[0.7rem] h-12 px-7' sx={stylesMui.bodyButton}>
                  Search
                </Button>
              </div>
              <Button
                onClick={handleAddCircleClick}
                className='ml-[1rem] h-12 px-6'
                sx={stylesMui.bodyButton}
              >
                + Add Hive
              </Button>
              <div className='flex gap-3'>
                <Typography sx={stylesMui.h6}>Total Hives</Typography>
                <Typography sx={stylesMui.h6}>{totalCircles}</Typography>
              </div>
            </div>
          </div>
        </div>

        <div
          id='hero-mobile'
          className='lg:hidden px-6 pt-6'
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Typography sx={stylesMui.h1}>Hive</Typography>
          <div className='flex flex-col justify-evenly items-center'>
            <div
              className={`w-[100%] h-[40] rounded-[12px] border px-4 my-8 gap-4 flex justify-center items-center`}
            >
              <Button
                onClick={handleAddCircleClick}
                className='ml-[1rem]'
                sx={{ ...stylesMui.bodyButton, width: '8rem' }}
              >
                + Add Hive
              </Button>
              <div className='flex gap-1'>
                <Typography sx={stylesMui.h6}>Total Hives</Typography>
                <Typography sx={stylesMui.h6}>{totalCircles}</Typography>
              </div>
            </div>
            <div
              id='search'
              className='col-span-2 flex justify-end items-end gap-2 md:gap-5 mr-[1rem] bg-none placeholder-slate-600 h-[9vh] w-[100%]'
            >
              <TextField
                sx={{ border: 'none', '& fieldset': { border: 'none' } }}
                style={{
                  borderRadius: '24px',
                  backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                  height: '3rem',
                  border: 'none',
                  width: '100%',
                  maxWidth: '20rem',
                }}
                placeholder='Type here...'
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <Button className='ml-[0.5rem] h-11' sx={stylesMui.bodyButton}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className='flex justify-center items-center py-[2rem]'>
            <Loader />
          </div>
        ) : (
          <div
            id='summary'
            className='flex flex-col flex-nowrap gap-1 px-6 pt-4 lg:px-20 lg:pt-4'
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            {currentData &&
              currentData.map((hive: any, index: any) => (
                <HiveRowAdmin
                  key={index}
                  hiveName={hive?.name}
                  hiveId={hive?.circleId}
                  completed={hive?.noOfUsers}
                  total={60}
                  link={hive?.link}
                  firstButton={'View'}
                  secondButton={'Delete'}
                  isLocked={hive?.isLocked}
                  handleCircleListRefresh={() => fetchData()}
                />
              ))}
          </div>
        )}
        <div
          id='pagination'
          className='flex justify-center py-12'
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Pagination current={currentPage} total={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
      <CreateModal
        firstheading='Create New Hive'
        secondheading='Hivee Name'
        firstbutton='Cancel'
        secondbutton='Create'
        postText='Hi there!'
        isAddCircle={true}
        isOpen={isAddCircleModalOpen}
        handleClose={() => setIsAddCircleModalOpen(false)}
        handleCircleListRefresh={() => fetchData()}
      />
    </>
  )
}

export default AdminAuth(AdminCircle)
