import React from 'react';
import {Route,Routes} from 'react-router-dom'
import { AuthProvider } from './contexts/authContext/authContext';

import GeneralProtectedRoute from './components/ProtectedRouteComponents/GeneralProtectedRoutes';
import AdminProtectedRoute from './components/ProtectedRouteComponents/AdminProtectedRoutes';
import VoterProtectedRoute from './components/ProtectedRouteComponents/VoterProtectedRoutes';
import CandidateProtectedRoute from './components/ProtectedRouteComponents/CandidateProtectedRoutes';

import Login from './pages/auth/userVerification/login';
import Signup from './pages/auth/userVerification/signup';
import Dashboard from './pages/general/dashboard';
import ForgotPassword from './pages/auth/reset-password/forgotPassword';
import UpdatePassword from './pages/auth/reset-password/updatePassword';

import CreateHalka from './pages/admin/createHalka';
import InviteStakeHolders from './pages/admin/inviteStakeHolders';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/dashboard" element={<GeneralProtectedRoute elementBody={<Dashboard/>}/>}/>
        <Route path="/reset-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/new-password" element={<UpdatePassword/>}/>

        <Route path="/create-constituency" element={<AdminProtectedRoute elementBody={<CreateHalka/>}/>}/>
        <Route path="/invite-stakeholders" element={<AdminProtectedRoute elementBody={<InviteStakeHolders/>}/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;