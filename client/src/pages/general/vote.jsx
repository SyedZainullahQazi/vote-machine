import Navbar from "../../components/navbar/navbar";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { VoteAPI } from "../../apis/general/VoteAPI";
import { GetUser } from "../../apis/general/getuserdetailsAPI";
import { FetchClosestScheduleAPI } from "../../apis/general/GetClosestSchedule";
import { GetHalkaCandidatesAPI } from "../../apis/general/GetHalkaCandidates";
import { Pagination } from "../../components/pagination/pagination";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [schedulesData, setElectionSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userDetails,setUserDetails]=useState(null)
  // const userDetails = getUserDetailsFromLocalStorage();

  //userdata
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const userData=await GetUser(localStorage.getItem("jwtToken"));
        console.log(userData.data.user);
        setUserDetails(userData.data.user);
      }
      catch(error)
      {
        console.error("Error Fetching User Data");
      }
    }
    fetchData();
  },[stateUpdate])

  //candidates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesData = await GetHalkaCandidatesAPI(
          localStorage.getItem("jwtToken"),
          userDetails.halkaId
        );
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching election schedules:", error);
      }
    };
    if(userDetails)
    {
      fetchData();
    }
  }, [userDetails]);

  //schedules
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedulesData = await FetchClosestScheduleAPI();
        setElectionSchedule(schedulesData);
        console.log(schedulesData);
      } catch (error) {
        console.error("Error fetching election schedules:", error);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = candidates.slice(indexOfFirstItem, indexOfLastItem);

  const handleVote = async (candidate) => {
    await VoteAPI(localStorage.getItem("jwtToken"),candidate.id,userDetails.id);
    stateUpdate?setStateUpdate(false):setStateUpdate(true);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-page">
      <Navbar />
      <ToastContainer />
      <div className="content">
        {userDetails?(userDetails.votedFor?<h1>You have Already Voted</h1>: (schedulesData ? ( schedulesData.active ? (
          <div className="row">
            {/* CRUD SCREEN */}
            <div className="col-md-12">
              <h2>Vote In Your Halka</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Symbol</th>
                    <th>Party Name</th>
                    <th>Actions</th>
                    <th>{userDetails.votedFor?"true":"false"}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((candidate) => (
                    <tr key={candidate.cnic}>
                      <td>{candidate.username}</td>
                      <td>
                        <LazyLoadImage
                          alt="User"
                          src={"/uploads/" + candidate.symbolImg}
                          effect="blur"
                          style={{ borderRadius: "50%" }} 
                          width={40} 
                          height={40}
                        />
                      </td>
                      <td>{candidate.partyName}</td>
                      <td>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleVote(candidate)}
                        >
                          Vote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={candidates.length}
                paginate={paginate}
              />
            </div>
          </div>
        ) : (
          <h1>Voting Has Not Yet Started</h1>
        )):(<h1>No Voting Schedule In row</h1>))):<h1>Waiting</h1>}
      </div>
    </div>
  );
}
