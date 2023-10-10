/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import React from 'react';
import './Home.css';
import logo from '../../images/gyozillalogo.png';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        component="img"
        sx={{
          height: '200px',
          width: '200px',
        }}
        alt="Logo de l'application"
        src={logo}
      />
      <Typography variant="h6b">
        Bienvenue sur l'application Gyozilla
      </Typography>
    </Box>
  );
}
