import React from 'react';

import getUserDetailsFromLocalStorage from '../../helpers/userDetailsFromLocalStorage/getUserDetails';

import Navbar from '../../components/navbar/navbar';
import '../../styles/navbar/navbar.css'; // Import your updated CSS styles here

export default function Dashboard() {
  const  userDetails  = getUserDetailsFromLocalStorage();

  if (!userDetails) {
      return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <Navbar/>
      <div className="content">
        <h1> Hello World</h1>
      </div>
    </div>
  );
}