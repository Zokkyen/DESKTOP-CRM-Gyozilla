import './App.css';
import RouteConfig from 'routes';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import RoutesConfig from './routes'
import React from 'react';
import { Button, Card, ThemeProvider } from '@mui/material';
import defaultTheme from './utils/theming/theme';
import CustomDrawer from './components/CustomDrawer';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <RouteConfig />
      </Router>
    </ThemeProvider>
  );
}
