import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

// Create Axios instance
export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

// Create secured Axios instance
const SECURE_API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

// Intercept requests for secured API
SECURE_API.interceptors.request.use(
  (config) => {
    const router = useRouter()
    const unParsedToken = localStorage.getItem('userInfo')
    if (unParsedToken) {
      const tokenData = JSON.parse(atob(unParsedToken.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      if (tokenData.exp && tokenData.exp < currentTime) {
        localStorage.removeItem('userInfo')
        localStorage.clear()
        // Use Next.js router for navigation
        router.push('/login')
      } else {
        config.headers.Authorization = `Bearer ${unParsedToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const SignIn = (values: any) => API.post('/admin/api/login', values)
