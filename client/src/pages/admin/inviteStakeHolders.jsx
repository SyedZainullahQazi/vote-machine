import React, { useState, useEffect} from "react";
import Navbar from "../../components/navbar/navbar";
import { ToastContainer, toast } from "react-toastify";

import GetHalkaDetails from "../../apis/admin/halka/getHalkaDetails";
import { Pagination } from "../../components/pagination/pagination";
import { GetUserForInvitesAPI } from "../../apis/general/getuserdetailsAPI";
import { InviteUserAPI } from "../../apis/admin/InviteUser/InviteUserAPI";

export default function InviteStakeHolders() {
  const [halkaList, setHalkaList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedHalkas = await GetHalkaDetails(
          localStorage.getItem("jwtToken")
        );
        const fetchedUsers = await GetUserForInvitesAPI(
          localStorage.getItem("jwtToken")
        );
        setHalkaList(fetchedHalkas);
        setUserList(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function findHalkaNameById(halkaList, halkaId) {
    const foundHalka = halkaList.find((h) => h.halkaId === halkaId);
    return foundHalka ? foundHalka.halkaName : "Not Found";
  }

  const handleSubmit = async (user) => {
    try {
      const selectedHalkaId = document.querySelector(
        `#halka-${user.cnic}`
      ).value;

      if (!selectedHalkaId) {
        toast.error("Please select UserType");
        return;
      }

      const updatedUser = {
        ...user,
        halkaId: selectedHalkaId,
      };

      InviteUserAPI(localStorage.getItem("jwtToken"), updatedUser);

      updateUserList(user.cnic, updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserList = (cnic, updatedUser) => {
    setUserList((prevUserList) =>
      prevUserList.map((user) => {
        if (user.cnic === cnic) {
          return {
            ...user,
            halkaId: updatedUser.halkaId,
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="content row justify-content-center d-flex">
        <ToastContainer />
      </div>
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CNIC</th>
              <th>SELECT HALKA</th>
              <th>STATUS</th>
              <th>MY HALKA</th>
              <th>USER TYPE</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.cnic}>
                <td>{user.username}</td>
                <td>{user.cnic}</td>
                <td>
                  <select
                    id={`halka-${user.cnic}`}
                    className="form-select"
                    required
                  >
                    <option value="">Select Halka</option>
                    {halkaList.map((halka) => (
                      <option key={halka.halkaId} value={halka.halkaId}>
                        {halka.halkaName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {user.halkaId ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSubmit(user)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSubmit(user)}
                    >
                      Invite
                    </button>
                  )}
                </td>
                <td>
                  {user.halkaId
                    ? findHalkaNameById(halkaList, user.halkaId)
                    : "Na"}
                </td>
                <td>{user.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={userList.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
