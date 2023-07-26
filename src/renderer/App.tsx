import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import defaultTheme from './utils/theming/theme';
import RouteConfig from '../routes';
import { UserProvider } from './utils/UserContext';

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <RouteConfig />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}
