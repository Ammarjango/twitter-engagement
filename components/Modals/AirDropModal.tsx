import * as React from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '../styles'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AirDropModalProps {
  isOpen: boolean
  firstheading?: string
  secondheading?: string
  firstbutton?: string
  secondbutton?: string
  postText?: string
  handleClose: () => void
}

const AirDropModal: React.FC<AirDropModalProps> = ({
  isOpen,
  handleClose,
  firstheading,
  secondheading,
  firstbutton,
  secondbutton,
  postText,
}) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)
  const router = useRouter()

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  const handleViewPoints = () => {
    router.push('/user/airdrop')
  }

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
            padding: '1rem 1rem',
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
                  fontWeight: '500',
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
                fontWeight: '500',
                opacity: '1',
                // padding: '1.875%',
              }}
            >
              {secondheading}
            </Typography>
          </div>
          {/* <div className='flex flex-col justify-center items-center gap-4 lg:gap-3 mt-5'>
            <Typography color={theme.palette.text.primary} sx={stylesMui.h4}>
              Next airdrop in
            </Typography>
            <Typography sx={stylesMui.airdropCountdown}>115 : 02 : 58</Typography>
          </div>
          <div
            style={{ background: isDark ? '#2D2820' : '#FFFFFF' }}
            className='flex md:flex-row flex-col justify-around items-center gap-4 lg:gap-3 mt-5 py-5'
          >
            <div className='flex flex-col justify-center items-center gap-4 lg:gap-3 mt-5'>
              <Typography color={theme.palette.text.primary} sx={stylesMui.h4}>
                PREVIOUS EPOCH POINTS
              </Typography>
              <Typography sx={stylesMui.airdropCountdown}>00</Typography>
            </div>
            <div className='flex flex-col justify-center items-center gap-4 lg:gap-3 mt-5'>
              <Typography color={theme.palette.text.primary} sx={stylesMui.h4}>
                ALL-TIME POINTS
              </Typography>
              <Typography sx={stylesMui.airdropCountdown}>00</Typography>
            </div>
          </div> */}
          <div className='flex justify-center items-center gap-5 font-roboto mt-5'>
            {firstbutton ? (
              <Button onClick={handleClose} size='large' sx={stylesMui.bodyButton}>
                {firstbutton}
              </Button>
            ) : null}
            {secondbutton ? (
              <Link href={'/user/airdrop'}>
                <Button size='large' sx={stylesMui.bodyButton}>
                  {secondbutton}
                </Button>
              </Link>
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AirDropModal
