import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext/authContext';

export function ProtectedRoute({ elementBody: Component,}) {
    const {isLoggedIn} = useAuth();
  
    return (
      <>
        {isLoggedIn ? (
          Component
        ) : (
          <Navigate to="/" replace />
        )}
      </>
    );
  }

export default ProtectedRoute;
