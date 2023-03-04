import React from 'react'

import { Box, LinearProgress } from '@mui/material'

const appStatusLoaderContainer = { position: 'absolute', width: '100%' }

export const AppStatusLoader = () => {
  return (
    <Box sx={appStatusLoaderContainer}>
      <LinearProgress color="primary" />
    </Box>
  )
}
