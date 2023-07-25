import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import RouteConfig from 'routes';

export default function App() {
  return (
    <Router>
      <RouteConfig />
    </Router>
  );
}
