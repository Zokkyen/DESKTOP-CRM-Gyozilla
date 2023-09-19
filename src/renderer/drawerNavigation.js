import RamenDiningIcon from '@mui/icons-material/RamenDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import Profile from './profile/Profile';
import Home from './home/Home';
import CrudEmployee from './crudEmployee/CrudEmployee';
import Ca from './ca/Ca';
import CrudIngredient from './crudIngredient/CrudIngredient';
import CrudStock from './crudStock/CrudStock';

const arrayNavigation = [
  {
    label: 'Accueil',
    icon: <HomeIcon />,
    component: {
      callback: ({ callback }) => <Home onLinkClick={callback} />,
    },
  },
  {
    label: 'CA',
    icon: <TrendingUpIcon />,
    component: {
      callback: ({ callback }) => <Ca onLinkClick={callback} />,
    },
  },
  {
    label: 'Profil',
    icon: <AccountCircleIcon />,
    component: {
      callback: ({ callback }) => <Profile onLinkClick={callback} />,
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
    label: 'Ingrédients',
    icon: <InventoryIcon />,
    component: {
      callback: ({ callback }) => <CrudIngredient onLinkClick={callback} />,
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
