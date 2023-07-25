import { RamenDining } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import { Route, Routes } from "react-router-dom";
import CrudProducts from "renderer/crudProducts/CrudProducts";
import HomeDrawer from "renderer/drawer/HomeDrawer";
import Home from "renderer/home/Home";

const RouteConfig = ()=>{
const routes = [
    {
        path: '/',
        element: <HomeDrawer/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/products',
        element: <CrudProducts/>
    },
]
return (
    <Routes>
        {routes.map((route, index)=>(
            <Route key={index} path={route.path} element={route.element} />
        ))}
    </Routes>
)
}

export default RouteConfig;