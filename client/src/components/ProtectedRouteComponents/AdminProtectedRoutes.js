import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { GetUser } from "../../apis/general/getuserdetailsAPI";
import { useAuth } from "../../contexts/authContext/authContext";

export function AdminProtectedRoute({ elementBody: Component }) {
  const { isLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await GetUser(localStorage.getItem("jwtToken"));
        console.log(fetchedUser.data.user);
        setUserDetails(fetchedUser.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!userDetails && isLoggedIn) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      {isLoggedIn && userDetails.userType === "admin" ? (
        Component
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}

export default AdminProtectedRoute;
