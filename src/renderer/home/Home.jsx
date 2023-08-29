/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20vh',
      }}
    >
      <Typography variant="h6b">Bienvenue</Typography>
    </Box>
  );
}
