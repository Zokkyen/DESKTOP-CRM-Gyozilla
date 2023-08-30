/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-cycle */
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import Profile from './profile/Profile';
import Home from './home/Home';
import Ca from './ca/Ca';
import CrudIngredient from './crudIngredient/CrudIngredient';
import CrudStock from './crudStock/CrudStock';
import OrdersPage from './order/Order';

const arrayNavigation = [
  {
    label: 'Accueil',
    icon: <HomeIcon />,
    roles: [1, 2, 3, 4],
    component: {
      callback: ({ callback }) => <Home onLinkClick={callback} />,
    },
  },
  {
    label: 'CA',
    icon: <TrendingUpIcon />,
    roles: [2, 4],
    component: {
      callback: ({ callback }) => <Ca onLinkClick={callback} />,
    },
  },
  {
    label: 'Profil',
    icon: <AccountCircleIcon />,
    roles: [1, 2, 4],
    component: {
      callback: ({ callback }) => <Profile onLinkClick={callback} />,
    },
  },
  {
    label: 'Produits',
    icon: <RamenDiningIcon />,
    roles: [3, 4],
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
    label: 'Stock',
    icon: <InventoryIcon />,
    roles: [3, 4],
    component: {
      callback: ({ callback }) => <CrudStock onLinkClick={callback} />,
    },
  },
  {
    label: 'Commandes',
    icon: <ChecklistIcon />,
    roles: [3, 4],
    component: {
      callback: ({ callback }) => <OrdersPage onLinkClick={callback} />,
    },
  },
];

export const getNavigationItemsForRole = (role) => {
  return arrayNavigation.filter((item) => {
    return item.roles ? item.roles.includes(role) : false;
  });
};

export default arrayNavigation;
