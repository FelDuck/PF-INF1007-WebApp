import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken } from '@/utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // <- nouveau

  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setToken(savedToken);
      setIsAuth(true);
    }
    setIsLoading(false); // <- indique que le chargement est terminé
  }, []);

  const login = (token) => {
    saveToken(token);
    setToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuth, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
