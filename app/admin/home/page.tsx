'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, TextField, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import UserRow from '@/components/UserRow/UserRow'
import Pagination from '@/components/Pagination'
import dynamic from 'next/dynamic'
import { stylesMui } from '@/components/styles'
import axios from 'axios'
// const CircleEChart = dynamic(() => import('@/components/Charts/CircleEchart'), { ssr: false })
import CircleEChart from '@/components/Charts/CircleEchart'
import UserEngagementChart from '../../../components/Charts/UserEngagementChart'
import AdminAuth from '../AdminAuth'
import { useColorContext } from 'context/ColorContext'
import InputField from '@/components/InputFields/InputField'
import Loader from '@/components/Loader/Loader'

const Home = () => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [userChartLoading, setUserChartLoading] = useState(false)
  const [circleChartLoading, setCircleChartLoading] = useState(false)
  const [userData, setUserData] = useState<any>([])
  const [userSearch, setUserSearch] = useState<any>([])
  const [token, setToken] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [allEngagement, setAllEngagementData] = useState<any>(null)
  const [allCircleEngagement, setAllCircleEngagementData] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const { color } = useColorContext()

  stylesMui.bodyButton.background = color
  stylesMui.loginButton.background = color
  stylesMui.headerButton.background = color

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/showusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      let userDetail = response?.data
      if (userDetail && Array.isArray(userDetail?.data)) {
        let usertemp = await handleUserMapping(userDetail?.data)
        setUserData(usertemp)
        setUserSearch(usertemp)
        setLoading(false)
      } else {
        console.log('No user data available')
      }
    } catch (error: any) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleUserMapping = (data: any) => {
    return data
      .map((data: any) => {
        return data?.members?.map((member: any) => {
          return {
            name: member?.username,
            userId: member?._id,
            isSuspended: member?.isSuspend,
            isBlocked: member?.isBlock,
            isDeleted: member?.isDeleted,
            members: data?.members?.length,
            circleName: data?.circleName,
            noOfPosts: data?.posts?.length,
            userPosts: data?.posts,
            circleId: data?.circleId,
          }
        })
      })
      .flat()
  }

  const fetchAllEngagementData = async () => {
    try {
      setUserChartLoading(true)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/engagement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response && response.data) {
        setAllEngagementData(response.data)
        setUserChartLoading(false)
      } else {
        setAllEngagementData(null)
      }
    } catch (error: any) {
      console.error(error?.message)
      setUserChartLoading(false)
    }
  }

  const fetchAllCircleEngagementData = async () => {
    try {
      setCircleChartLoading(true)
      const response = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/circle/engagement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response) {
        const circleEngagementData = response?.data
        if (circleEngagementData && circleEngagementData.length > 0) {
          setAllCircleEngagementData(
            circleEngagementData?.sort((a: any, b: any) => a.engagements - b.engagements),
          )
          setCircleChartLoading(false)
        }
      }
    } catch (error: any) {
      console.error(error?.message)
      setCircleChartLoading(false)
    }
  }

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value)
    let searchString = e.target.value
    const filteredUsers = userData.filter(
      (user: any) =>
        user?.name.toLowerCase().includes(searchString.toLowerCase()) ||
        user?.circleName.toLowerCase().includes(searchString.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchString.toLowerCase()),
    )
    setUserSearch(filteredUsers)
    setCurrentPage(1)
  }

  const totalUsers = userSearch?.length
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const currentData = userSearch.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleStatus = (user: any): string => {
    if (user.isBlocked == true) {
      return 'Blocked'
    } else if (user.isSuspended == true) {
      return 'Suspend'
    } else if (user.isDeleted == true) {
      return 'Deleted'
    } else {
      return 'Active'
    }
  }

  useEffect(() => {
    if (token) {
      fetchAllEngagementData()
      fetchAllCircleEngagementData()
      fetchData()
    }
  }, [token])
  let isMobile = useMediaQuery('(max-width: 1024px)')
  useEffect(() => {
    const savedValue = window?.localStorage?.getItem('admin_access_token')
    setToken(savedValue || '')

    setIsMobileScreen(isMobile)
  }, [])

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  return (
    <div>
      <div
        id='wrapper'
        className='min-h-screen'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {userChartLoading && circleChartLoading ? (
          <div className='flex justify-center items-center py-[2rem]'>
            <Loader />
          </div>
        ) : (
          <div
            id='graphs'
            className='flex flex-col flex-wrap lg:flex-row justify-between px-6 pt-6 lg:px-20 lg:pt-8'
          >
            <Typography sx={stylesMui.h1} style={{ paddingBottom: '1rem' }}>
              Welcome!
            </Typography>
            <div className='flex flex-col justify-center items-center lg:flex-row gap-6 lg:gap-16 w-full'>
              {allEngagement && allEngagement?.percentage ? (
                <UserEngagementChart
                  allEngagementUsers={allEngagement?.allEngagementUsers || 22}
                  allUsers={allEngagement?.allUsers || 22}
                  percentage={
                    allEngagement && allEngagement?.percentage
                      ? Math.trunc(allEngagement?.percentage)
                      : 22
                  }
                />
              ) : (
                <div className='flex justify-center items-center'>
                  <p className='text-[#FFC504] animate-bounce'>No data Available</p>
                </div>
              )}
              {allCircleEngagement?.length > 0 ? (
                <CircleEChart
                  allCircleEngagement={allCircleEngagement.filter(
                    (engagement: any) => engagement.engagements > 0,
                  )}
                />
              ) : (
                <div className='flex justify-center items-center'>
                  <p className='text-[#FFC504] animate-bounce'>No data Available</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div
          id='users-table-header'
          className='flex flex-col lg:flex-row justify-between px-6 pt-6 lg:px-20 lg:pt-8'
        >
          <Typography sx={stylesMui.h1}>
            Where engagement grows, opportunities&apos; bloom !
          </Typography>
        </div>

        {/* <div id='hive-absolute' className='relative w-full'>
          <div className='absolute top-[80px] left-0 lg:-top-[10px]'>
            <Image src='/Images/hiveBg.svg' width={100} height={100} alt='hive' />
          </div>
        </div> */}

        {loading ? (
          <div className='flex pt-[3rem] pb-[0.5rem] justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <div
            id='users-table'
            className='flex flex-col flex-nowrap gap-1 px-6 pt-4 lg:px-20 lg:pt-12 pb-[2rem]'
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            {isMobileScreen ? (
              <div
                id='search'
                className='flex sm:justify-normal md:justify-end items-center gap-5 w-[100%] mb-5'
              >
                <input
                  style={{
                    borderRadius: '12px',
                    backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                    maxHeight: '70%',
                    height: '3rem',
                    border: 'none',
                    width: '100%',
                    // outline: '#E3E3E3CC',
                    zIndex: 5,
                    paddingLeft: '0.6rem',
                  }}
                  placeholder='   Type here...'
                  onChange={handleSearchChange}
                  value={searchTerm}
                  onFocus={(e) => (e.target.style.border = '1px solid #ffcc00')}
                  onBlur={(e) => (e.target.style.border = 'none')}
                />
                <Button
                  className='ml-[0.5rem]'
                  sx={{ ...stylesMui.bodyButton, padding: '0.6rem 1.5rem' }}
                >
                  Search
                </Button>
              </div>
            ) : (
              <div
                id='users-table-columns'
                className={`flex justify-between rounded-[5px] h-[60px] ${
                  isDark ? 'bg-[#282217] border border-[#FFFFFF1F]' : 'bg-[#E3E3E3CC]'
                }`}
                style={{
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.12)'
                    : '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <div className='flex items-center justify-between w-[57%]'>
                  <Typography className='col-span-1 flex items-center pl-4 w-[25%] font-roboto font-semibold'>
                    User Name
                  </Typography>
                  <Typography className='col-span-1 flex items-center justify-center pl-4 w-[25%] font-roboto font-semibold'>
                    Hive Name
                  </Typography>
                  <Typography className='col-span-1 flex items-center justify-center t pl-4 w-[25%] font-roboto font-semibold'>
                    Email
                  </Typography>
                  <Typography className='col-span-1 flex items-center justify-center pl-4 w-[25%] font-roboto font-semibold'>
                    Status
                  </Typography>
                </div>
                <div
                  id='search'
                  className='col-span-2 flex justify-end items-center w-[30%] gap-3 mr-[1rem] bg-none placeholder-slate-600'
                >
                  <input
                    style={{
                      borderRadius: '24px',
                      backgroundColor: isDark ? '#51493B' : '#fff',
                      maxHeight: '70%',
                      height: '3rem',
                      border: 'none',
                      width: '100%',
                      zIndex: 5,
                      // outline: '#282217',
                      paddingLeft: '0.6rem',
                    }}
                    placeholder='   Type here...'
                    onChange={handleSearchChange}
                    value={searchTerm}
                    onFocus={(e) => (e.target.style.border = '1px solid #ffcc00')}
                    onBlur={(e) => (e.target.style.border = 'none')}
                  />
                  <Button className='ml-[1rem] px-6' sx={stylesMui.bodyButton}>
                    Search
                  </Button>
                </div>
              </div>
            )}

            {currentData &&
              currentData.map((user: any, index: any) => (
                <UserRow
                  key={index}
                  userName={user?.name}
                  userId={user?.userId}
                  circleId={user?.circleId}
                  accountName={user?.circleName}
                  email={user?.email}
                  noOfPosts={user?.noOfPosts}
                  userPosts={user?.userPosts}
                  status={handleStatus(user)}
                  completed={user?.completed}
                  total={user?.total}
                  isSuspended={user?.isSuspended}
                  isBlocked={user?.isBlocked}
                  isDeleted={user?.isDeleted}
                  isMobileScreen={isMobileScreen}
                  isAdminRow={true}
                  handleAdminUserListRefresh={() => fetchData()}
                />
              ))}
          </div>
        )}
        {userData && userData.length > 8 && (
          <div
            id='pagination'
            className='flex justify-center py-12'
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Pagination current={currentPage} total={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAuth(Home)
