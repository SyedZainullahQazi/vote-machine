import {toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik"; 
import { useState, useEffect } from "react";
import * as Yup from "yup"; 

import { deleteElectionSchedule } from "../../apis/admin/scheduleElection/ScheduleElectionAPI";
import { fetchElectionSchedules } from "../../apis/admin/scheduleElection/ScheduleElectionAPI";
import Navbar from "../../components/navbar/navbar"; // Import your Navbar component
import { Pagination } from "../../components/pagination/pagination";
import ScheduleElectionAPI from "../../apis/admin/scheduleElection/ScheduleElectionAPI";
import { updateElectionScheduleAPI } from "../../apis/admin/scheduleElection/ScheduleElectionAPI";

import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("Start Date is required"),
  startTime: Yup.string().required("Start Time is required"),
  endDate: Yup.date().required("End Date is required"),
  endTime: Yup.string().required("End Time is required"),
});

const ScheduleElection = () => {
  const [electionSchedules, setElectionSchedules] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [electionUpdateState, setElectionUpdateState] = useState(false);

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
  }, [stateUpdate]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = electionSchedules.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formik = useFormik({
    initialValues: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      id:"",
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      const startDateTime = new Date(`${values.startDate} ${values.startTime}`);
      const endDateTime = new Date(`${values.endDate} ${values.endTime}`);
      const currentDateTime = new Date();
      const errors = {};

      if (endDateTime <= startDateTime) {
        errors.endTime = "Greater EndTime";
      }

      if (endDateTime < startDateTime) {
        errors.endDate = "Greater EndDate";
      }

      if (startDateTime < currentDateTime) {
        errors.startTime = "Start Time must be after current time";
        if (
          new Date(startDateTime.toDateString()) <
          new Date(currentDateTime.toDateString())
        ) {
          errors.startDate = "date stoday or later";
        }
      }

      if (endDateTime < currentDateTime) 
      {
        errors.endTime = "End Time must be after current time";
        if (
          new Date(endDateTime.toDateString()) <
          new Date(currentDateTime.toDateString())
        ) {
          errors.endDate = "date today or later";
        }
      }

      if (Object.keys(errors).length > 0) {
        formik.setErrors(errors);
        return;
      }

      let data = { startDateTime, endDateTime, active: false };

      if(!electionUpdateState)
      {
        await ScheduleElectionAPI(localStorage.getItem("jwtToken"), data);
      }
      else
      {
        data["_id"]=values.id;
        await updateElectionScheduleAPI(localStorage.getItem("jwtToken"),data);
      }
      stateUpdate?setStateUpdate(false) : setStateUpdate(true);
    },
  });

  const handleDelete = (schedule) => {
    if (!schedule.active) {
      deleteElectionSchedule(localStorage.getItem("jwtToken"), schedule._id);
      stateUpdate ? setStateUpdate(false) : setStateUpdate(true);
    } else {
      toast.error("Cannot Delete An Active Election");
    }
  };

  const handleUpdate=(schedule)=>{
    if(!schedule.active)
    {
      console.log(new Date(schedule.startDateTime).toTimeString());
      // Update the formik values with the selected schedule's values
      formik.setValues({
      startDate: new Date(schedule.startDateTime).toISOString().split('T')[0],
      startTime: new Date(schedule.startDateTime).toTimeString().substring(0, 5),
      endDate: new Date(schedule.endDateTime).toISOString().split('T')[0],
      endTime:new Date(schedule.endDateTime).toTimeString().substring(0, 5),
      id:schedule._id
      });

      // Set the update state
       setElectionUpdateState(true);
    }
    else{
      toast.error("Cannot Update An Active Elections");
    }
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="content row justify-content-center d-flex">
        <ToastContainer />
      </div>
      <div className="col-md-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <div className="d-flex">
              <div className="mr-4">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="text-danger">{formik.errors.startDate}</div>
                ) : (
                  <br />
                )}
              </div>
              <div>
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.startTime && formik.errors.startTime ? (
                  <div className="text-danger">{formik.errors.startTime}</div>
                ) : (
                  <br />
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="d-flex">
              <div className="mr-4">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="text-danger">{formik.errors.endDate}</div>
                ) : (
                  <br />
                )}
              </div>
              <div className="mr-4">
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="form-control"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.endTime && formik.errors.endTime ? (
                  <div className="text-danger">{formik.errors.endTime}</div>
                ) : (
                  <br />
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            {electionUpdateState ? "UPDATE SCHEDULE" : "INSERT ELECTION SCHEDULE NOW"}
          </button>
          {electionUpdateState ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                setElectionUpdateState(false);
              }}
            >
              DISCARD
            </button>
          ) : (
            <></>
          )}
        </form>
      </div>
      {/* CRUD SCREEN */}

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
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((schedule) => (
              <tr key={schedule._id}>
                <td>{new Date(schedule.startDateTime).toDateString()}</td>
                <td>{new Date(schedule.endDateTime).toDateString()}</td>
                <td>{new Date(schedule.startDateTime).toTimeString()}</td>
                <td>{new Date(schedule.endDateTime).toTimeString()}</td>
                <td>{schedule.active ? "Active" : "Not Active"}</td>
                <td>
                  <button className="btn btn-outline-warning"
                  onClick={()=>{handleUpdate(schedule);}}
                  >UPDATE</button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      handleDelete(schedule);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
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
};

export default ScheduleElection;
