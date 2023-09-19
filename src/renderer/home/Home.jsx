/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6b">
        Bienvenue sur l'application Gyozilla
      </Typography>
    </Box>
  );
}
