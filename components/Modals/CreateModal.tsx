import * as React from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '../styles'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as api from '../../utils/api'

interface CreateModalProps {
  isOpen: boolean
  firstheading: string
  secondheading?: string
  firstbutton: string
  secondbutton: string
  postText?: any
  isAddCircle?: boolean
  isCircleView?: boolean
  handleClose: () => void
  circleId?: any
  handleCircleListRefresh?: () => void
}

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  handleClose,
  firstheading,
  secondheading,
  firstbutton,
  secondbutton,
  postText,
  isAddCircle,
  isCircleView,
  circleId,
  handleCircleListRefresh,
}) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [tweetText, setTweetText] = useState('')
  const [getToken, setGetToken] = useState('')
  const [circleName, setCircleName] = useState('')
  const [adminToken, setAdminToken] = useState('')

  useEffect(() => {
    const savedValue = window.localStorage.getItem('loginToken')
    setGetToken(savedValue || '')
  }, [])

  useEffect(() => {
    const savedValue = window?.localStorage?.getItem('admin_access_token')
    setAdminToken(savedValue || '')
  }, [])

  const handleCreatePost = async () => {
    try {
      const data = {
        circleId: `${circleId}`,
        text: tweetText,
      }
      const response = await api.createTweet(data)
      toast.success('Post added successfully')
      window.location.reload()
      handleClose()
    } catch (error) {
      console.error(error)
      toast.error('Error while adding Post')
    }
  }

  const handleAddCircle = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/add/circle`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    }
    const data = {
      name: `${circleName}`,
    }
    try {
      const response = await axios.post(url, data, { headers })

      toast.success('Hive added successfully')
      if (handleCircleListRefresh) {
        handleCircleListRefresh()
      }
      handleClose()
    } catch (error) {
      console.error(error)
      toast.error('Error while adding circle')
    }
  }

  const handleOnChnage = (e: any) => {
    setTweetText(e.target.value)
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
        sx={{ padding: '92px' }}
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
            boxShadow: 24,
            borderRadius: '0.5rem',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 2rem',
          }}
        >
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
            <Typography
              sx={{
                color: theme.palette.text.primary,
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '600',
                padding: '1.875%',
              }}
            >
              {secondheading}
            </Typography>
          </div>
          {isAddCircle == true ? (
            <TextField
              multiline
              fullWidth
              // value={postText}
              onChange={(e: any) => {
                setCircleName(e.target.value)
              }}
              InputProps={{
                sx: {
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontSize: '1.125rem',
                  fontWeight: '300',
                  marginBottom: '1rem',
                  borderRadius: '1rem',
                  borderColor: isDark ? '#51493B' : '#DBDBDB',
                  backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                  border: 'none',
                },
              }}
            ></TextField>
          ) : (
            <TextField
              multiline
              fullWidth
              value={tweetText}
              onChange={(e: any) => handleOnChnage(e)}
              InputProps={{
                sx: {
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontSize: '1.125rem',
                  fontWeight: '300',
                  marginBottom: '1rem',
                  borderRadius: '1rem',
                  borderColor: isDark ? '#51493B' : '#DBDBDB',
                  backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                  border: 'none',
                },
              }}
            ></TextField>
          )}
          <div className='flex justify-center items-center gap-5 font-roboto'>
            {firstbutton ? (
              <Button onClick={handleClose} size='large' sx={stylesMui.bodyButton}>
                {firstbutton}
              </Button>
            ) : null}
            {secondbutton ? (
              isAddCircle === true ? (
                <Button onClick={handleAddCircle} size='large' sx={stylesMui.bodyButton}>
                  {secondbutton}
                </Button>
              ) : (
                <Button onClick={handleCreatePost} size='large' sx={stylesMui.bodyButton}>
                  {secondbutton}
                </Button>
              )
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateModal
