import {useState,useEffect} from 'react';
import { fetchElectionSchedules } from '../../../apis/admin/scheduleElection/ScheduleElectionAPI';
import Navbar from '../../../components/navbar/navbar';
import { ToastContainer } from 'react-toastify';
import { Pagination } from '../../../components/pagination/pagination';
import HalkaResults from './halkaResults';
import {Link} from "react-router-dom"

const Results=()=>{
    const [electionSchedules, setElectionSchedules] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const schedulesData = await fetchElectionSchedules(
            localStorage.getItem("jwtToken")
          );
          setElectionSchedules(schedulesData);
        } catch (error) {
          console.error("Error fetching election schedules:", error);
        }
      };
      fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = electionSchedules.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <th>START DATE</th>
            <th>END DATE</th>
            <th>START TIME</th>
            <th>END TIME</th>
            <th>STATUS</th>
            <th>UPDATE</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((schedule) => (
             new Date(schedule.endDateTime)<new Date()?
            <tr key={schedule._id}>
              <td>{new Date(schedule.startDateTime).toDateString()}</td>
              <td>{new Date(schedule.endDateTime).toDateString()}</td>
              <td>{new Date(schedule.startDateTime).toTimeString()}</td>
              <td>{new Date(schedule.endDateTime).toTimeString()}</td>
              <td>{schedule.active ? "Active" : "Not Active"}</td>
              <td>
                <Link to={`/results/halka-results`} state={schedule}>
                  <button className="btn btn-outline-warning">View Details</button>
                </Link>
              </td>
            </tr>
            :<></>))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={electionSchedules.length}
        paginate={paginate}
      />
    </div>
  </div>
);
}

export default Results;