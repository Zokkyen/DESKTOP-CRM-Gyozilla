/* eslint-disable camelcase */
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now().valueOf() / 1000;
      if (decoded.exp > currentTime) {
        setUser(decoded);
      } else {
        // Le token a expiré
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const logIn = useCallback((token) => {
    const decoded = jwt_decode(token);
    if (decoded.role) {
      setUser(decoded);
      localStorage.setItem('token', token);
    }
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  const value = useMemo(
    () => ({ user, logIn, logOut, loading }),
    [user, logIn, logOut, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
