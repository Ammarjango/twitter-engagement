import * as React from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '../styles'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import BtnLoader from '../Loader/BtnLoader'
import * as api from '../../utils/api'
import { FaRetweet, FaRegHeart } from 'react-icons/fa'
import { BiSolidSend } from 'react-icons/bi'
interface ViewPostModalProps {
  isOpen: boolean
  firstheading?: string
  secondheading?: string
  firstbutton?: string
  secondbutton?: string
  postText?: string
  isAddCircle?: boolean
  tweetId?: any
  handleClose: () => void
  likedTweet?: any
  reTweeted?: any
  addedComments?: any
  adminViewPost?: boolean
  tweetUserId?: any
  userView?: any
}

const ViewPostModal: React.FC<ViewPostModalProps> = ({
  isOpen,
  handleClose,
  firstheading,
  secondheading,
  firstbutton,
  secondbutton,
  postText,
  isAddCircle,
  tweetId,
  likedTweet,
  reTweeted,
  addedComments,
  adminViewPost,
  tweetUserId,
  userView,
}) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [postResponse, setPostText] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [likeloader, setLikeLoader] = useState(false)
  const [retweetloader, setRetweetLoader] = useState(false)
  const [replyloader, setReplyLoader] = useState(false)

  const getAdminToken = localStorage.getItem('admin_access_token') || ''
  const [replyText, setReplyText] = useState('')
  // //////////////////////////////////////Getting post tweets//////////////////////////////////////
  const handleGetPost = async () => {
    try {
      setLoading(true)
      if (tweetId) {
        const response = await api.getPostTweet(tweetId)
        setLoading(false)
        setPostText(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetAdminPost = async () => {
    if (adminViewPost) {
      try {
        setLoading(true)
        if (tweetId) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/admin/display/onepost`,
            { tweetId: tweetId, userId: tweetUserId },
            {
              headers: {
                Authorization: `Bearer ${getAdminToken}`,
              },
            },
          )
          setLoading(false)
          setPostText(response.data)
          return response.data
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  }
  useEffect(() => {
    handleGetAdminPost()
  }, [tweetId, adminViewPost])

  useEffect(() => {
    handleGetPost()
  }, [tweetId])

  // //////////////////////////////////////////////Getting post tweets//////////////////////////////////////
  const handleLikePost = async (id: any) => {
    let tweetId = id
    try {
      setLikeLoader(true)
      const response = await api.LikeTweet({ tweetId })
      const result = response.data

      if (result.status) {
        toast.success('Tweet Liked Successfully')
      }

      setTimeout(() => {
        window.location.reload()
        setLikeLoader(false)
      }, 3000)
      return result
    } catch (error: any) {
      setLikeLoader(false)
      toast.error(error.response.data.message)
    }
  }

  const handleRetweetPost = async (id: any) => {
    let tweetId = id
    try {
      setRetweetLoader(true)
      const response = await api.ReTweet({ tweetId })
      const result = response.data

      if (result) {
        toast.success('Retweeted Successfully')
      }
      setTimeout(() => {
        window.location.reload()

        setRetweetLoader(false)
      })
      return result
    } catch (error: any) {
      setRetweetLoader(false)
      toast.error(error.response.data.message)
    }
  }

  const handleReplyPost = async (id: any, reply: string) => {
    let tweetId = id
    let text = reply
    try {
      setReplyLoader(true)
      const response = await api.addComments({ tweetId, text })
      const result = response.data

      if (result) {
        toast.success('Comment Added Successfully')
      }
      setReplyLoader(false)
      window.location.reload()
      return result
    } catch (error: any) {
      setReplyLoader(false)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  return (
    <div>
      <Modal
        sx={{ padding: '92px', backdropFilter: 'blur(15px)' }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '70%', sm: '500px', md: '600px' },
            bgcolor: theme.palette.secondary.main,
            boxShadow: 48,
            borderRadius: userView ? '1rem' : '0.5rem',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 2rem',
          }}
        >
          {userView ? (
            <div
              style={{
                position: 'absolute',
                top: '10%',
                right: 15,
                cursor: 'pointer',
                transform: 'translateY(-50%)',
              }}
              onClick={() => {
                handleClose()
              }}
            >
              <CloseOutlinedIcon style={{ color: '#9A9A9A' }} />
            </div>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: 15,
                cursor: 'pointer',
                transform: 'translateY(-50%)',
              }}
              onClick={() => {
                handleClose()
              }}
            >
              <CloseOutlinedIcon style={{ color: '#9A9A9A' }} />
            </div>
          )}

          <div className='flex flex-col items-start'>
            {firstheading ? (
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  padding: '1.875%',
                }}
              >
                {firstheading}
              </Typography>
            ) : null}
          </div>
          {loading ? (
            <p className='text-center text-[#ECC115] animate-bounce'>Loading..</p>
          ) : userView ? (
            <div
              style={{
                color: theme.palette.text.primary,
                textAlign: 'start',
                padding: '10px',
                fontFamily: 'Roboto',
                fontSize: '1.125rem',
                fontWeight: '300',
                marginBottom: '1rem',
                borderRadius: '1rem',
                borderColor: isDark ? '#51493B' : '#DBDBDB',
                backgroundColor: theme.palette.background.default,
                border: 'none',
              }}
            >
              {postResponse && postResponse?.data?.data?.text ? (
                <p>{postResponse && postResponse?.data?.data?.text}</p>
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    padding: '1.875%',
                  }}
                >
                  No Text
                </Typography>
              )}
            </div>
          ) : (
            <div
              style={{
                color: theme.palette.text.primary,
                textAlign: 'start',
                paddingLeft: '10px',
                fontFamily: 'Roboto',
                fontSize: '1.125rem',
                fontWeight: '300',
                marginBottom: '1rem',
                borderRadius: '1rem',
                borderColor: isDark ? '#51493B' : '#DBDBDB',
                backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                border: 'none',
              }}
            >
              {postResponse && postResponse?.data?.data?.text ? (
                <p>{postResponse && postResponse?.data?.data?.text}</p>
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    padding: '1.875%',
                  }}
                >
                  No Text
                </Typography>
              )}
            </div>
          )}
          {userView ? (
            <div className='flex flex-col items-start'>
              <TextField
                disabled={addedComments ? true : false}
                multiline
                fullWidth
                placeholder='Post your reply'
                onChange={(e) => setReplyText(e.target.value)}
                InputProps={{
                  sx: {
                    '& .MuiInputBase-input::placeholder': {
                      color: isDark ? '#fff' : '#000',
                    },
                  },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {
                          if (addedComments === true) {
                            toast.error('You have already commented on this post')
                            return
                          } else {
                            handleReplyPost(postResponse?.data?.data?.id, replyText)
                          }
                        }}
                      >
                        {replyloader ? (
                          <BtnLoader color={true} />
                        ) : (
                          <BiSolidSend
                            style={{
                              color: isDark ? '#c1c1c1' : '#000',
                              display: addedComments == true ? 'hidden' : 'inline',
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  border: 'none',
                  '& fieldset': { border: 'none' },
                  '& .MuiOutlinedInput-root ': {
                    color: isDark ? '#fff' : '#000',
                  },
                }}
                style={{
                  width: '97%',
                  textAlign: 'start',
                  padding: '10px',
                  fontFamily: 'Roboto',
                  fontSize: '1.125rem',
                  fontWeight: '300',
                  marginBottom: '1rem',
                  borderRadius: '1rem',
                  border: 'none',
                  backgroundColor: isDark ? '#101010' : '#DBDBDB',
                  marginRight: '1rem',
                }}
              ></TextField>
            </div>
          ) : null}
          <div className='flex justify-center items-center gap-5 font-roboto'>
            {firstbutton && userView ? (
              <Button
                disabled={reTweeted ? true : loading ? true : false}
                onClick={() => handleRetweetPost(postResponse?.data?.data?.id)}
                size='large'
                sx={stylesMui.bodyButton}
              >
                {retweetloader ? <BtnLoader /> : firstbutton}
                <FaRetweet size={22} style={{ paddingLeft: '0.5rem' }} />
              </Button>
            ) : null}
            {secondbutton && !adminViewPost ? (
              isAddCircle ? (
                <Button
                  onClick={() => handleLikePost(tweetId)}
                  size='large'
                  sx={stylesMui.bodyButton}
                >
                  {secondbutton}
                </Button>
              ) : (
                <Button
                  disabled={likedTweet ? true : loading ? true : false}
                  onClick={() => handleLikePost(postResponse?.data?.data?.id)}
                  size='large'
                  sx={stylesMui.bodyButton}
                >
                  {likeloader ? <BtnLoader /> : <FaRegHeart size={22} />}
                </Button>
              )
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ViewPostModal
