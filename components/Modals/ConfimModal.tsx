'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '../styles'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface ConfirmModalProps {
  isOpen: boolean
  firstheading: string
  secondheading: string
  firstbutton: string
  secondbutton: string
  isDeleteCircle?: boolean
  isDeletePost?: boolean
  circleId?: string
  userId?: string
  tweetId?: string
  handleClose: () => void
  handleCircleListRefresh?: () => void
  handleAdminUserListRefresh?: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  handleClose,
  firstheading,
  secondheading,
  firstbutton,
  secondbutton,
  isDeleteCircle,
  isDeletePost,
  circleId,
  userId,
  tweetId,
  handleCircleListRefresh,
  handleAdminUserListRefresh,
}) => {
  const { theme } = useTheme()
  const [adminToken, setAdminToken] = useState()

  const handleDeleteCircle = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/delete/circle/${circleId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    }
    try {
      const response = await axios.delete(url, { headers })
      toast.success(response.data.message)
      handleClose()
      if (handleCircleListRefresh) handleCircleListRefresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const handleDeletePost = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/delete/${tweetId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    }
    try {
      const response = await axios.delete(url, { headers })
      toast.success(response.data.message)
      handleClose()
      setTimeout(() => {
        window.location.reload()
      }, 3500)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const handleUserClick = async () => {
    if (secondbutton == 'Suspend') {
      handleSuspendUser(true)
    } else if (secondbutton == 'Resume') {
      handleSuspendUser(false)
    } else if (secondbutton == 'Block') {
      handleBlockUser(true)
    } else if (secondbutton == 'UnBlock') {
      handleBlockUser(false)
    } else {
      if (secondbutton == 'Delete') {
        handleDeleteUser(true)
      } else {
        handleDeleteUser(false)
      }
    }
  }

  const handleDeleteUser = async (updatedStatus: boolean) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/delete/user`
    const formData = { id: userId, deletedUser: updatedStatus }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    }

    try {
      const response = await axios.delete(url, { headers, data: formData })
      toast.success(response.data.msg)
      handleClose()
      if (response?.status === 200) if (handleAdminUserListRefresh) handleAdminUserListRefresh()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }
  const handleSuspendUser = async (updatedStatus: boolean) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/suspend`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    }
    try {
      const response = await axios.post(
        url,
        { id: userId, suspendUser: updatedStatus },
        { headers },
      )
      toast.success(response.data.msg)
      handleClose()
      if (response?.status === 200) if (handleAdminUserListRefresh) handleAdminUserListRefresh()
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const handleBlockUser = async (updatedStatus: any) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/block`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    }
    try {
      const response = await axios.post(url, { id: userId, blockUser: updatedStatus }, { headers })
      toast.success(response.data.msg)
      handleClose()
      if (response?.status === 200) if (handleAdminUserListRefresh) handleAdminUserListRefresh()
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('admin_access_token')) {
      // Token exists
      const loginToken: any = localStorage.getItem('admin_access_token')
      setAdminToken(loginToken)
    } else {
      // Token does not exist
      console.log('admin_access_token does not exist')
    }
  }, [])

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
            width: { xs: '70%', sm: '300px', md: '300px' },
            height: '150px',
            bgcolor: theme.palette.secondary.main,
            boxShadow: 24,
            borderRadius: '0.5rem',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 2rem',
          }}
        >
          {firstheading ? (
            <Typography
              sx={{
                color: '#FF4242',
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
              fontSize: '20px',
              fontWeight: '500',
              padding: '1.875%',
            }}
          >
            {secondheading}
          </Typography>
          <div className='flex justify-center items-center gap-5 pt-4 font-roboto'>
            {firstbutton ? (
              <Button onClick={handleClose} size='large' sx={stylesMui.bodyButton}>
                {firstbutton}
              </Button>
            ) : null}
            {secondbutton ? (
              <Button
                onClick={() => {
                  isDeleteCircle
                    ? handleDeleteCircle()
                    : isDeletePost
                    ? handleDeletePost()
                    : handleUserClick()
                }}
                size='large'
                sx={stylesMui.deleteButton}
              >
                {secondbutton}
              </Button>
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ConfirmModal
