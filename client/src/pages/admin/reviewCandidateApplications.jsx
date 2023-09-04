import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApproveCandidateAPI } from "../../apis/admin/reviewCandidate/reviewCandidateAPI";
import GetPendingApprovalsAPI from "../../apis/admin/reviewCandidate/reviewCandidateAPI";
import Navbar from "../../components/navbar/navbar";
import { Pagination } from "../../components/pagination/pagination";
import { RejectCandidateAPI } from "../../apis/admin/reviewCandidate/reviewCandidateAPI";

const ReviewCandidateApplications = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingApprovals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const approvalsData = await GetPendingApprovalsAPI(
          localStorage.getItem("jwtToken")
        );
        setPendingApprovals(approvalsData);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    };
    fetchData();
  }, [stateUpdate]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = async (approval) => {
    if(!approval.halkaId)
    {
      toast.error("Assign Halka to The User First");
    } 
    else
    {
      await ApproveCandidateAPI(localStorage.getItem("jwtToken"),approval);
      stateUpdate?setStateUpdate(false):setStateUpdate(true);
    }  
  };

  const handleDelete = (approval) => {
    RejectCandidateAPI(localStorage.getItem("jwtToken"),approval);
    stateUpdate?setStateUpdate(false):setStateUpdate(true);
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <ToastContainer/>
      <div className="content">
        <div className="row">
          {/* CRUD SCREEN */}
          <div className="col-md-12">
            <h2>Pending Approvals</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User CNIC</th>
                  <th>Username</th>
                  <th>Halka</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((approval) => (
                  <tr key={approval._id}>
                    <td>{approval.cnic}</td>
                    <td>{approval.username}</td>
                    <td>{approval.halkaId?approval.halkaId:"NA"}</td>
                    <td>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleApprove(approval)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(approval)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={pendingApprovals.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCandidateApplications;
