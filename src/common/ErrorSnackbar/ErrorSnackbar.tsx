import * as React from 'react'

import { Stack, Snackbar, AlertProps } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import { useAppDispatch, useAppSelector } from '../../store'
import { setAppErrorAC } from '../../store/app/app-actions'
import { appErrorSelectors } from '../../store/app/app-selectors'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch()
  const error = useAppSelector(appErrorSelectors)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
