import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../store";
import { authLoginTC } from "../../store/appAuth/appAuth-reducer";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export interface FormDataValuesType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const theme = createTheme();

export const AuthLoginForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values: FormDataValuesType): void => {
      dispatch(authLoginTC(values));
      formik.resetForm();
    },
  });

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
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              id="email"
              type="email"
              margin="normal"
              label="Email Address"
              error={!!formik.errors.email}
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                formik.errors.email
              }
              {...formik.getFieldProps("email")}
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              margin="normal"
              label="Password"
              error={!!formik.errors.password}
              {...formik.getFieldProps("password")}
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                formik.errors.password
              }
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              {...formik.getFieldProps("rememberMe")}
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
