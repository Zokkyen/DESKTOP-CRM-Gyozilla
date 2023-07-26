import CrudProducts from 'renderer/crudProducts/CrudProducts';
import Home from 'renderer/home/Home';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeDrawer from './renderer/drawer/HomeDrawer';
import Login from './renderer/login/Login';
import { UserContext } from './renderer/utils/context/UserContext';

function RouteConfig() {
  const { user } = useContext(UserContext);

  const routes = [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/home',
      component: HomeDrawer,
      protected: true,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/products',
      component: CrudProducts,
      protected: true,
    },
  ];

  return (
    <Routes>
      {routes.map((route) => {
        let element;
        if (route.protected) {
          element = user ? <route.component /> : <Navigate to="/" />;
        } else {
          element = <route.component />;
        }

        return <Route key={route.path} path={route.path} element={element} />;
      })}
    </Routes>
  );
}

export default RouteConfig;
