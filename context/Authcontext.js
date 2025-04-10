import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken, isAuthenticated } from '@/utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  //VRAI CODE
  /*
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setToken(savedToken);
      setIsAuth(true);
    }
  }, []);
  */

  //FAUX CODE POUR TESTS
  useEffect(() => {
    // Simulation provisoire d'un utilisateur connecté
    setToken('fake-token');
    setIsAuth(true);
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
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};
