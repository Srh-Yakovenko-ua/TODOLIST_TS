import React from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { authButton, authContainer, authSingInAvatar } from './auth-login-form.style'
import { useAuthLoginForm } from './useAuthLoginForm'

const theme = createTheme()

export const AuthLoginForm = () => {
  const { errors, touched, handleSubmit, getFieldProps } = useAuthLoginForm()

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={authContainer}>
          <pre>
            Test account credentials:
            <br />
            Email: free@samuraijs.com <br />
            Password: free
          </pre>
          <Avatar sx={authSingInAvatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="email"
              type="email"
              margin="normal"
              label="Email Address"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              {...getFieldProps('email')}
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              margin="normal"
              label="Password"
              error={touched.password && !!errors.password}
              {...getFieldProps('password')}
              helperText={touched.password && errors.password}
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              {...getFieldProps('rememberMe')}
            />
            <Button type="submit" fullWidth variant="contained" sx={authButton}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
