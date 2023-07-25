import './App.css';
import RouteConfig from 'routes';
import { MemoryRouter as Router } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { ThemeProvider } from '@mui/material';
import defaultTheme from './utils/theming/theme';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <RouteConfig />
      </Router>
    </ThemeProvider>
  );
}
