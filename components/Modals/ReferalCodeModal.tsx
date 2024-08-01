import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import { Box, Button, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import { useTheme } from 'context/ThemeContext'
import CloseIcon from '@mui/icons-material/Close'
import { stylesMui } from '../styles'

interface Props {
  isOpen: boolean
  handleClose: () => void
}

const ReferalCodeModal = ({ isOpen, handleClose }: Props) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const [availReferralCode, setReferalValue] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  console.log('availReferralCode :>> ', availReferralCode)
  const handleChnage = (e: any) => {
    e.preventDefault()
    const value = e.target.value
    const referalCode = `Join PollenFinance.xyz using the referral code below.
      Code: ${value}
      Come grow your X account with us!
      Ultimate (3,3) of engagement
    `
    console.log('referalCode :>> ', referalCode)
    setReferalValue(referalCode)
    if (value.trim() === '') {
      setError(true)
      setHelperText('Enter Code')
    } else {
      setError(false)
      setHelperText('')
    }
  }

  const signInURL = `https://twitter.com/i/oauth2/authorize?client_id=TGVyOS1jd0VUXzlQRXRIOVdNblg6MTpjaQ&redirect_uri=http://3.144.0.155/api/twitter/callback?availReferralCode=${availReferralCode}&response_type=code&scope=like.write+users.read+tweet.read+tweet.write+follows.read+mute.read+like.read+block.read+offline.access&state=0-rsJAIDgALlYWs0SDQNIUWwzniGEGFfHy-OpbugHmw%3D&code_challenge=challenge&code_challenge_method=plain`

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  const handleSignIn = () => {
    if (availReferralCode.trim() === '') {
      setError(true)
      setHelperText('Enter Code')
      return
    } else {
      window.location.href = signInURL
    }
  }

  return (
    <>
      <Modal
        sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
            padding: '1rem 1rem',
          }}
        >
          <div className='flex justify-between mt-[-1rem]'>
            <DialogTitle
              id='customized-dialog-title'
              sx={{
                color: theme.palette.text.primary,
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '1.125rem',
                fontWeight: '500',
                padding: '1.875%',
              }}
            >
              Add Referal Code
            </DialogTitle>
            <IconButton
              sx={{ color: theme.palette.text.primary }}
              aria-label='close'
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <p className='w-full h-[0.5px] bg-[gray] px-0'></p>

          <div>
            <TextField
              error={error}
              label='Enter Referal Code'
              id='outlined-error-helper-text'
              variant='filled'
              helperText={helperText}
              value={availReferralCode}
              onChange={(e: any) => handleChnage(e)}
              size='small'
              sx={{
                width: '100%',
                color: 'white',
                paddingTop: '1rem',
                '& .MuiFilledInput-root::after': {
                  borderBottom: '2px solid #FFC504 !important',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiInputLabel-root::after': {
                  color: '#FFC504 !important',
                },
                '& .MuiFilledInput-root': {
                  backgroundColor: 'transparent !important',
                  color: '#FFC504',
                },
              }}
            />
            <div className='flex w-[94%] my-5 pt-6 px-4'>
              <Button onClick={handleSignIn} size='large' sx={stylesMui.loginButton}>
                Login
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ReferalCodeModal
