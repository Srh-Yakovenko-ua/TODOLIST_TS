import React from 'react'

import { Box, CircularProgress } from '@mui/material'

const initializedLoaderContainer = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f0f8ff',
}

export const InitializedLoader = () => {
  return (
    <Box sx={initializedLoaderContainer}>
      <CircularProgress />
    </Box>
  )
}
