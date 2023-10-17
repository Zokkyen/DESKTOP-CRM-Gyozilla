import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import CrudProducts from 'renderer/crudProducts/CrudProducts';
import HomeDrawer from './renderer/drawer/HomeDrawer';
import Login from './renderer/login/Login';
import { UserContext } from './renderer/utils/context/UserContext';

export default function RouteConfig() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate('/home');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={user ? <HomeDrawer /> : <Navigate to="/" />}
      />
      {/* <Route
        path="/products"
        element={user ? <CrudProducts /> : <Navigate to="/" />}
      /> */}
    </Routes>
  );
}
