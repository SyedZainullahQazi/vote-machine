import React from 'react';
import { useAuth } from "../../contexts/authContext/authContext";

import Navbar from '../../components/navbar/navbar';
import '../../styles/navbar/navbar.css'; // Import your updated CSS styles here

export default function Dashboard() {
  const { userDetails } = useAuth();
  if (!userDetails) {
      return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <Navbar role={userDetails.userType} />
      <div className="content">
        <h1> Hello World</h1>
      </div>
    </div>
  );
}