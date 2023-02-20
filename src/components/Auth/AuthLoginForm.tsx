import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthLoginForm } from "./useAuthLoginForm";

const theme = createTheme();

export const AuthLoginForm = () => {
  const { errors, touched, handleSubmit, getFieldProps } = useAuthLoginForm();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
              {...getFieldProps("email")}
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              margin="normal"
              label="Password"
              error={touched.password && !!errors.password}
              {...getFieldProps("password")}
              helperText={touched.password && errors.password}
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              {...getFieldProps("rememberMe")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
