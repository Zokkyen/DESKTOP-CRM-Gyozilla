<<<<<<< HEAD
import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import RouteConfig from 'routes';

export default function App() {
  return (
    <Router>
      <RouteConfig />
    </Router>
=======
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { Button, Card, ThemeProvider } from '@mui/material';
import defaultTheme from './utils/theming/theme';
import CustomDrawer from './components/CustomDrawer';

function Hello() {
  return (
    // <div>
    //   <div className="Hello">
    //     <img width="200" alt="icon" src={icon} />
    //   </div>
    //   <h1>electron-react-boilerplate</h1>
    //   <div className="Hello">
    //     <a
    //       href="https://electron-react-boilerplate.js.org/"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <button type="button">
    //         <span role="img" aria-label="books">
    //           📚
    //         </span>
    //         Read our docs
    //       </button>
    //     </a>
    //     <a
    //       href="https://github.com/sponsors/electron-react-boilerplate"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <button type="button">
    //         <span role="img" aria-label="folded hands">
    //           🙏
    //         </span>
    //         Donate
    //       </button>
    //     </a>
    //   </div>
    // </div>
    <CustomDrawer />
  );
}

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </ThemeProvider>
>>>>>>> 4c43d396157c0da727c56029e6cfa9436a6ddea1
  );
}
