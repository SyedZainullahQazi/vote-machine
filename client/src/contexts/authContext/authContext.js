import React, { createContext, useContext, useState,useEffect } from 'react';

import { GetUser } from '../../apis/general/getuserdetailsAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [userDetails,setUserDetails]=useState(null);

  const login = newToken => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
    setUserDetails(null);
  };

  const getUserDetail = async (token) => {
    try {
      const response = await GetUser(token);
      return (response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        if (token) {
          const user = await getUserDetail(token);
          setUserDetails(user);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserDetails();
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,getUserDetail,userDetails}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);