import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);
  
  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
  }), [user, login, logout]);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;