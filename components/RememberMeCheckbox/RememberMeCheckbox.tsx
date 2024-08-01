import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Box, Typography } from '@mui/material'

const RememberMeCheckbox: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false)

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked)
  }

  return (
    <div
      className='sm:flex '
      //   ={{
      //     display: { xs: "flex", md: "" },
      //     justifyContent: { xs: "flex", md: 0 },
      //     width: mdDown ? "100%" : "",
      //     marginRight: mdDown ? "0px" : "360px"
      //   }}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{ marginLeft: { xs: '4.5vw', md: 0 } }}
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color='primary'
          />
        }
        label={
          <p>RememberMe</p>
          //   <Typography
          //     fontWeight="500"
          //     variant="subtitle1"
          //     type="Checkbox"
          //     sx={{ textDecoration: "none" }}
          //   >
          //     Remember Me
          //   </Typography>
        }
      />
    </div>
  )
}

export default RememberMeCheckbox
