import RamenDiningIcon from '@mui/icons-material/RamenDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import CrudStock from './crudStock/CrudStock';
import Home from './home/Home';
import CrudEmployee from './crudEmployee/CrudEmployee';

const arrayNavigation = [
  {
    label: 'Accueil',
    icon: <HomeIcon />,
    component: {
      callback: ({ callback }) => <Home onLinkClick={callback} />,
    },
  },
  {
    label: 'Produits',
    icon: <RamenDiningIcon />,
    component: {
      callback: ({ callback }) => <CrudProducts onLinkClick={callback} />,
    },
  },
  {
    label: 'Employés',
    icon: <PersonIcon />,
    component: {
      callback: ({ callback }) => <CrudEmployee onLinkClick={callback} />,
    },
  },
  {
    label: 'Stock',
    icon: <InventoryIcon />,
    component: {
      callback: ({ callback }) => <CrudStock onLinkClick={callback} />,
    },
  },
];

export default arrayNavigation;
