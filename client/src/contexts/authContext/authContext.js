import React, { createContext, useContext, useState,useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Import the crypto-js library

import { GetUser } from '../../apis/general/getuserdetailsAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [userDetails,setUserDetails]=useState(localStorage.getItem('userDetails'));

  const login = newToken => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');
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
          
          const encryptedUserDetails = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            `${process.env.JWT_SECRET}`
          ).toString();

          localStorage.setItem('userDetails', encryptedUserDetails);
          console.log(localStorage.getItem('userDetails'));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserDetails();
  }, [token,setUserDetails]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,userDetails}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);