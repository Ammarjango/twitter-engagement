import axios from 'axios'
import { toast } from 'react-toastify'

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

const SECURE_API = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

SECURE_API.interceptors.request.use(
  (config) => {
    const getToken = typeof window !== 'undefined' ? localStorage.getItem('loginToken') || '' : ''

    if (getToken) {
      const tokenData = JSON.parse(atob(getToken.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      if (tokenData.exp && tokenData.exp < currentTime) {
        localStorage.removeItem('loginToken')
        localStorage.clear()
        toast.error('Session Expired Please SignIn again')
        window.location.href = '/'
      } else {
        config.headers.Authorization = `Bearer ${getToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// ////////////////////////////////User side API Routes////////////////////////////////////////////////

export const getUserSideCircles = () => API.get('/user/show/circle')
export const getUserDetail = () => SECURE_API.get('/user/details')
export const joinCircle = (id: string) => SECURE_API.post(`/user/join/circle/${id}`)
export const LeaveCircle = (circleId: string) => SECURE_API.delete(`/user/leave/circle/${circleId}`)
export const allPostOfCircle = (circleId: string) => SECURE_API.get(`/user/get/posts/${circleId}`)
export const getPostTweet = (tweetId: string) => SECURE_API.get(`/user/get/post/tweet/${tweetId}`)
export const LikeTweet = (tweetId: any) => SECURE_API.post('/user/like/tweet', tweetId)
export const ReTweet = (tweetId: any) => SECURE_API.post('/user/retweet', tweetId)
export const addComments = (tweetId: any) => SECURE_API.post('/user/comment', tweetId)
export const getPoints = () => SECURE_API.get('/user/points')
export const createTweet = (data: any) => SECURE_API.post('/user/create/tweets', data)
