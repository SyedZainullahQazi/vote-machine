import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/authContext/authContext";

import '../../styles/navbar/navbar.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Navbar = ({role}) => {
  const {userDetails,logout}=useAuth();
  if (!userDetails) {
    // Render a loading indicator or placeholder while userDetails is being fetched
    return <div>Loading...</div>;
  }  
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Dashboard</Link></li>
        {role === 'voter' && (
          <>
            <li><Link to="/apply" className="nav-link">Apply as Candidate</Link></li>
            <li><Link to="/vote" className="nav-link">Vote</Link></li>
            <li><Link to="/results" className="nav-link">Results</Link></li>
          </>
        )}
        {role === 'admin' && (
          <>
            <li><Link to="/vote" className="nav-link">Vote</Link></li>
            <li><Link to="/results" className="nav-link">Results</Link></li>
            <li><Link to="/create-constituency" className="nav-link">Create Halka</Link></li>
            <li><Link to="/review-candidate-applications" className="nav-link">Candidate Applications</Link></li>
            <li><Link to="/schedule-elections" className="nav-link">Schedule Elections</Link></li>
            <li><Link to="/invite-stakeholders" className="nav-link">Invite Stakeholders</Link></li>
          </>
        )}
        {role === 'candidate' && (
          <>
            <li><Link to="/vote" className="nav-link">Vote</Link></li>
            <li><Link to="/results" className="nav-link">Results</Link></li>
            <li><Link to="/my-voters" className="nav-link">My Voters</Link></li>
            <li><Link to="/total-vote-casts" className="nav-link">Total Vote Casts</Link></li>
          </>
        )}
      </ul>
      <div className="user-details">
        <LazyLoadImage
          alt="User"
          src={"/uploads/" + userDetails.profilePic}
          effect="blur"
          style={{ borderRadius: '50%' }} // Apply border-radius to make the image round
          width={40} // Adjust the size if needed
          height={40} // Adjust the size if needed
        />
        <span className="username">{userDetails.username}</span>
        <button className="signout-button" onClick={logout}>Sign Out</button>
      </div>

    </nav>
  );
};

export default Navbar;