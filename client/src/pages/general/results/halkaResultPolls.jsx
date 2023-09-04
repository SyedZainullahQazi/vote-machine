import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CandidateResultDetailsAPI from '../../../apis/general/CandidateResultDetailsAPI';
import Navbar from '../../../components/navbar/navbar';
import { Pagination } from '../../../components/pagination/pagination';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function HalkaResultPoll() {

    const navigate = useNavigate();
    const { scheduleId, halkaId } = useParams();
    const [candidates, setCandidates] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const candidatesData = await CandidateResultDetailsAPI(localStorage.getItem("jwtToken"), scheduleId, halkaId);
                candidatesData ? setCandidates(candidatesData) : navigate("/results");
            }
            catch (error) {
                console.error("Error fetching election schedules:", error);
                navigate("/results");
            }
        };
        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = candidates?Array.isArray(candidates)?candidates.slice(indexOfFirstItem, indexOfLastItem) : []:[];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const findWinner=()=>{
        let username=""
        if(Array.isArray(candidates)&&candidates)
        {
            let votecount=0;
            for(let i=0;i<candidates.length;i++)
            {
                if(votecount<candidates[i].voteCount){
                    votecount=candidates[i].votecount;
                    username=candidates[i].username;
                }
            }
            return username;}
        return username;
    }
      
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="content row justify-content-center d-flex">
                <ToastContainer />
            </div>
            <div className="row justify-content-center d-flex ">
                <div className="col-md-8">
                    <h1>Winner is : {findWinner()}</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Candidate ID</th>
                                <th>Candidate Name</th>
                                <th>Candidate Party Name</th>
                                <th>Party Logo</th>
                                <th>Vote Count</th>
                                <th>Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((candidate) => (

                                <tr key={candidate.candidateId}>
                                    <td>{candidate.candidateId}</td>
                                    <td>{candidate.username}</td>
                                    <td>{candidate.partyName}</td>
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
                                    <td>{candidate.voteCount}</td>
                                    <td>{candidate?.winner?"Winner":""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={candidates ? candidates.length : 0}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    );
}