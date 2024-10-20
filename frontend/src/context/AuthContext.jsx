import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.element,
  };
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
