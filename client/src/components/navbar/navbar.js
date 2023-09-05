import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/authContext/authContext";

import getUserDetailsFromLocalStorage from '../../helpers/userDetailsFromLocalStorage/getUserDetails';

import '../../styles/navbar/navbar.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Navbar = () => {
  const {logout}=useAuth();
  const userDetails=getUserDetailsFromLocalStorage();

  if (!userDetails) {
    return <div>Loading...</div>;
  }  
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Dashboard</Link></li>
        {userDetails.userType === 'voter' && (
          <>
            <li><Link to="/apply" className="nav-link">Apply as Candidate</Link></li>
            <li><Link to="/vote" className="nav-link">Vote</Link></li>
            <li><Link to="/results" className="nav-link">Results</Link></li>
          </>
        )}
        {userDetails.userType === 'admin' && (
          <>
            <li><Link to="/results" className="nav-link">Results</Link></li>
            <li><Link to="/create-constituency" className="nav-link">Create Halka</Link></li>
            <li><Link to="/review-candidate-applications" className="nav-link">Candidate Applications</Link></li>
            <li><Link to="/schedule-elections" className="nav-link">Schedule Elections</Link></li>
            <li><Link to="/invite-stakeholders" className="nav-link">Invite Stakeholders</Link></li>
          </>
        )}
        {userDetails.userType === 'candidate' && (
          <>
            <li><Link to="/vote" className="nav-link">Vote</Link></li>
            <li><Link to="/results" className="nav-link">Results</Link></li>
            <li><Link to="/my-voters" className="nav-link">My Voters</Link></li>
          </>
        )}
      </ul>
      <div className="user-details">
        <LazyLoadImage
          alt="User"
          src={"/uploads/" + userDetails.profilePic}
          effect="blur"
          style={{ borderRadius: '50%' }}
          width={40} 
          height={40} 
        />
        <span className="username">{userDetails.username}</span>
        <button className="signout-button" onClick={logout}>Sign Out</button>
      </div>

    </nav>
  );
};

export default Navbar;