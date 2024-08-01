import * as React from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useTheme } from 'context/ThemeContext'
import { stylesMui } from '../styles'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
//@ts-ignore
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { FaWhatsapp, FaFacebook } from 'react-icons/fa'
import TwitterX from '../../public/Images/TwitterX.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface ReferralModalProps {
  isOpen: boolean
  firstheading?: string
  secondheading?: string
  firstbutton?: string
  secondbutton?: string
  referralCode?: any
  handleClose: () => void
  isLoggedIn?: boolean
  isLauchAppModal?: boolean
}

const ReferralModal: React.FC<ReferralModalProps> = ({
  isOpen,
  handleClose,
  firstheading,
  secondheading,
  firstbutton,
  secondbutton,
  referralCode,
  isLoggedIn,
  isLauchAppModal,
}) => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)

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
          {referralCode ? (
            <TextField
              multiline
              fullWidth
              value={referralCode}
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
                endAdornment: (
                  <InputAdornment position='end'>
                    {/* <IconButton onClick={handleCopyURL} edge='end'>
                      <ContentCopyIcon />
                    </IconButton> */}
                    <CopyToClipboard text={referralCode}>
                      <IconButton edge='end'>
                        <ContentCopyIcon />
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                ),
              }}
            >
              {referralCode}
            </TextField>
          ) : isLauchAppModal ? (
            <p className='text-center text-[#ECC115] animate-bounce'>Coming Soon</p>
          ) : (
            <p className='text-center text-[#ECC115] animate-bounce'>User Not Logged In</p>
          )}
          {referralCode && (
            <div className='flex flex-col gap-2 lg:gap-0 lg:flex-row justify-around items-center'>
              {firstbutton ? (
                <Button onClick={handleClose} size='large' sx={stylesMui.bodyButton}>
                  {firstbutton}
                </Button>
              ) : null}
              {secondbutton ? (
                <div
                  style={{
                    backgroundColor: isDark ? '#51493B' : '#DBDBDB',
                    color: theme.palette.text.primary,
                    fontSize: '20px',
                  }}
                  className='flex justify-around items-center rounded-[12px] gap-5 p-[3px]'
                >
                  Or Share With
                  <WhatsappShareButton url={referralCode}>
                    {<FaWhatsapp color='green' size={35} />}
                  </WhatsappShareButton>
                  <TwitterShareButton url={referralCode}>
                    <Image src={TwitterX} alt='twitter' width={35} height={35} />
                  </TwitterShareButton>
                  {/* <FacebookShareButton url={referralCode}>
                    {<FaFacebook color='blue' size={35} />}
                  </FacebookShareButton> */}
                </div>
              ) : null}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default ReferralModal
