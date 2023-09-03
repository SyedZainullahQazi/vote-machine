import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/authContext';

import getUserDetailsFromLocalStorage from '../../helpers/userDetailsFromLocalStorage/getUserDetails';

export function AdminProtectedRoute({ elementBody: Component}) {
    const {isLoggedIn} = useAuth();
    const userDetails=getUserDetailsFromLocalStorage();

    if(!userDetails && isLoggedIn)
    {
      return (<div>Loading.....</div>);
    }

    return (
      <>
        {(isLoggedIn && userDetails.userType==="admin") ? (
          Component
        ) : (
          <Navigate to="/" replace />
        )}
      </>
    );
  }

export default AdminProtectedRoute;
