import React from "react";
import { Box, Button, Container, Typography, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { containerError } from "./error-route-style";

export const ErrorRoute404 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={containerError}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
