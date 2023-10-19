import { ToastContainer } from 'react-toastify';
import { useLocation,Link,useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

import Navbar from '../../../components/navbar/navbar';
import { Pagination } from '../../../components/pagination/pagination';

export default function HalkaResults() {
    const location = useLocation();
    const schedule = location.state;
    const navigate=useNavigate();
    useEffect(() => {if (!schedule?.halka) {navigate("/results");}}, [schedule,navigate]);

    const halka = (schedule?(schedule.halka?schedule.halka:[]):[]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = halka.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="">
            <Navbar />
            <div className="content row justify-content-center d-flex">
                <ToastContainer />
            </div>
            <div className="row justify-content-center d-flex ">
            <div className="col-md-8">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Halka ID</th>
                            <th>Halka Name</th>
                            <th>Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((halka) => (
                                <tr key={halka.halkaId}>
                                    <td>{halka.halkaId}</td>
                                    <td>{halka.halkaName}</td>
                                    <td>
                                        <Link to={`/results/halka-results/polls/${schedule?._id}/${halka.halkaId}`} state={halka}>
                                            <button className="btn btn-outline-warning">View Results</button>
                                        </Link>
                                    </td>
                                </tr>
                                ))}
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={halka.length}
                    paginate={paginate}
                />
            </div>
            </div>
        </div>
    );
}