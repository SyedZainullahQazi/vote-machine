import React from 'react';
import {Route,Routes} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoutes';
import { AuthProvider } from './contexts/authContext/authContext';


import Login from './pages/auth/userVerification/login';
import Signup from './pages/auth/userVerification/signup';
import Dashboard from './pages/general/dashboard';
import ForgotPassword from './pages/auth/reset-password/forgotPassword';
import UpdatePassword from './pages/auth/reset-password/updatePassword';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/dashboard" element={<ProtectedRoute elementBody={<Dashboard/>}/>}/>
        <Route path="/reset-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<UpdatePassword/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
