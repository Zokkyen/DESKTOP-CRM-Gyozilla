import RamenDiningIcon from '@mui/icons-material/RamenDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import CrudStock from './crudStock/CrudStock';
import Profile from './profile/Profile';
import Home from './home/Home';
import Ca from './ca/Ca';
import OrdersPage from './order/Order';

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
    label: 'Stock',
    icon: <InventoryIcon />,
    component: {
      callback: ({ callback }) => <CrudStock onLinkClick={callback} />,
    },
  },
  {
    label: 'Commandes',
    icon: <ChecklistIcon />,
    component: {
      callback: ({ callback }) => <OrdersPage onLinkClick={callback} />,
    },
  },
];

export default arrayNavigation;
