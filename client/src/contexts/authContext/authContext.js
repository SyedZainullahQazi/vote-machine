import React, { createContext, useContext, useState } from 'react';
// import EnableVotingAPI from '../../apis/general/OnOffVotingAPI';
// import { DisableVotingAPI } from '../../apis/general/OnOffVotingAPI';
// import { FetchClosestScheduleAPI} from '../../apis/general/GetClosestSchedule';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  const login = newToken => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);