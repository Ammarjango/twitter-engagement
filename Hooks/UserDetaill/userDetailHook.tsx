import React, { useEffect, useState } from 'react'
import * as api from '../../utils/api'

const useUserDetailHook = () => {
  const [userLoading, setLoading] = useState(false)
  const [userDetails, setGetDetails] = useState<any>(null)

  // ///////////////////////////////////Get User Details////////////////////////////////////////

  const getToken = typeof window !== 'undefined' ? localStorage.getItem('loginToken') || '' : ''
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true)
        if (getToken) {
          const response = await api.getUserDetail()
          if (response.data.status) {
            setGetDetails(response.data)
            setLoading(false)
            return response.data
          }
        } else {
          console.log('No token found')
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    if (getToken) {
      getUserDetails()
    }
  }, [getToken])

  return {
    userDetails,
    userLoading,
  }
}
export default useUserDetailHook
