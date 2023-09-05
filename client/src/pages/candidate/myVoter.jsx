import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';

import MyVoterAPI from '../../apis/candidate/MyVoterAPI';
import { GetUser } from '../../apis/general/getuserdetailsAPI';

import Navbar from '../../components/navbar/navbar';
import { Pagination } from '../../components/pagination/pagination';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyVoter=()=> {
    const [myVoters, setMyVoters] = useState([])
    const [userDetails,setUserDetails]=useState(null);

    useEffect(()=>{
        const fetchData=async()=>{
          try{
            const userData=await GetUser(localStorage.getItem("jwtToken"));
            setUserDetails(userData.data.user);
          }
          catch(error)
          {
            console.error("Error Fetching User Data");
          }
        }
        fetchData();
      },[])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const votersData = await MyVoterAPI(localStorage.getItem("jwtToken"),userDetails.halkaId);
                setMyVoters(votersData);
            }
            catch (error) {
                console.error("Error fetching Voters", error);
            }
        };
        if(userDetails)
        {
            fetchData();
        }
    }, [userDetails]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = myVoters?Array.isArray(myVoters)?myVoters.slice(indexOfFirstItem, indexOfLastItem) : []:[];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
      
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="content row justify-content-center d-flex">
                <ToastContainer />
            </div>
            <div className="row justify-content-center d-flex ">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Profile Pic</th>
                                <th>Voter Name</th>
                                <th>Voter Cnic</th>
                                <th>Voter Halka</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((voter) => (

                                <tr key={voter._id}>
                                    <td>
                                        <LazyLoadImage
                                            alt="User"
                                            src={"/uploads/" + voter.profilePic}
                                            effect="blur"
                                            style={{ borderRadius: "50%" }}
                                            width={40}
                                            height={40}
                                        />
                                    </td>
                                    <td>{voter.username}</td>
                                    <td>{voter.cnic}</td>
                                    <td>{voter.halkaId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={myVoters ? myVoters.length : 0}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyVoter;