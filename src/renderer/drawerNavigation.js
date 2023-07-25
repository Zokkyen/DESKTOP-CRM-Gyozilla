import RamenDiningIcon from '@mui/icons-material/RamenDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import CrudStock from './crudStock/CrudStock';
import Home from './home/Home';

const arrayNavigation = [
    {
        label: 'Accueil',
        icon: <HomeIcon/>,
        component: <Home/>,
    },
    {
        label: 'Produits',
        icon: <RamenDiningIcon/>,
        component: <CrudProducts/>,
    },
    {
        label: 'Stock',
        icon: <InventoryIcon/>,
        component: <CrudStock/>,
    },
]

export default arrayNavigation;