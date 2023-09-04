import { Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

import { CreateHalkaAPI } from "../../apis/admin/halka/createHalkaAPI";
import { DeleteHalkaAPI } from "../../apis/admin/halka/deleteHalkaAPI";
import { UpdateHalkaAPI } from "../../apis/admin/halka/updateHalkaAPI";
import Navbar from "../../components/navbar/navbar";
import { Pagination } from "../../components/pagination/pagination";
import GetHalkaDetails from "../../apis/admin/halka/getHalkaDetails";

export default function CreateHalka() { 
  const [halkaList, setHalkaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingState, setEditingState] = useState(false);
  const [recordChange,setRecordChange]=useState(false);

  console.log("render hogaya");

    useEffect(() => {
      async function fetchHalkaData() {
        try {
          const fetchedHalka = await GetHalkaDetails(localStorage.getItem("jwtToken"));
          setHalkaList(fetchedHalka);
        } catch (error) {
          console.error(error);
        }
      }
      setRecordChange(false);
      fetchHalkaData();
    }, [recordChange]);
  
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = halkaList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formik = useFormik({
    initialValues: {
      halkaId: "",
      halkaName: "",
      halkaIdNew: "",
    },
    validationSchema: editingState
      ? Yup.object({
          halkaId: Yup.string()
            .matches(/^\d{4}$/, "HALKA ID must be exactly 4 digits")
            .required("Required"),
          halkaName: Yup.string()
            .min(3, "Must be 3 Chars")
            .required("Required"),
          halkaIdNew: Yup.string()
            .matches(/^\d{4}$/, "HALKA ID must be exactly 4 digits")
            .required("Required"),
        })
      : Yup.object({
          halkaId: Yup.string()
            .matches(/^\d{4}$/, "HALKA ID must be exactly 4 digits")
            .required("Required"),
          halkaName: Yup.string()
            .min(3, "Must be 3 Chars")
            .required("Required"),
        }),
    onSubmit: (values) => {
      if(!editingState)
      {
        const newHalka = {
          halkaId: values.halkaId,
          halkaName: values.halkaName,
        };
        const token = localStorage.getItem("jwtToken");
        CreateHalkaAPI(newHalka, token);
        setRecordChange(true);
      }
      else
      {
        const updateHalkaData={
          halkaId:values.halkaId,
          halkaName:values.halkaName,
          halkaIdNew:values.halkaIdNew
        };
        const updateHalka=async()=>{UpdateHalkaAPI(localStorage.getItem("jwtToken"),updateHalkaData);};
        updateHalka();
        setRecordChange(true);
        setEditingState(false);
      } 
    },
  });

  const deleteHalka = async (halkaId) => {
    console.log(halkaId);
    await DeleteHalkaAPI(localStorage.getItem("jwtToken"), halkaId);
    setRecordChange(true);
  };

  const editHalka = async (halkaId) => {
    formik.setFieldValue("halkaId", halkaId);
    setEditingState(true);
  };

  return (
    <>
      <div className="dashboard-page">
        <Navbar />
        <div className="content row justify-content-center d-flex">
          <ToastContainer />
          <div className="col-md-12">
            <Form onSubmit={formik.handleSubmit} className="row">
              <div className="col-2">
                <div className="form-group">
                  <label htmlFor="halkaId">Halka ID</label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    className="form-control"
                    id="halkaId"
                    name="halkaId"
                    placeholder={
                      editingState ? formik.values.halkaId : "Enter Halka ID"
                    }
                    readOnly={editingState}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.halkaId && formik.errors.halkaId ? (
                    <p>{formik.errors.halkaId}</p>
                  ) : (
                    <p>
                      <br />
                    </p>
                  )}
                </div>
              </div>
              {editingState ? (
                <div className="col-2">
                  <div className="form-group">
                    <label htmlFor="halkaName">New HalkaID</label>
                    <input
                      type="text"
                      onChange={formik.handleChange}
                      className="form-control"
                      id="halkaIdNew"
                      name="halkaIdNew"
                      placeholder="Enter New Halka ID"
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.halkaIdNew && formik.errors.halkaIdNew ? (
                      <p>{formik.errors.halkaIdNew}</p>
                    ) : (
                      <p>
                        <br />
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="col-2">
                <div className="form-group">
                  <label htmlFor="halkaName">Halka Name</label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    className="form-control"
                    id="halkaName"
                    name="halkaName"
                    placeholder="Enter Halka Name"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.halkaName && formik.errors.halkaName ? (
                    <p>{formik.errors.halkaName}</p>
                  ) : (
                    <p>
                      <br />
                    </p>
                  )}
                </div>
              </div>

              <div className="col-1">
                <br />
                <button type="submit" className="btn btn-outline-success">
                  {editingState?"Update":"Submit"}
                </button>
              </div>
              {editingState ? (
                  <div className="col-1">
                    <br/> 
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        setEditingState(false);
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <></>
                )}
            </Form>
          </div>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Halka ID</th>
                  <th>Halka Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((halka) => (
                  <tr key={halka.halkaId}>
                    <td>{halka.halkaId}</td>
                    <td>{halka.halkaName}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                          editHalka(halka.halkaId);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteHalka(halka.halkaId)}
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
              totalItems={halkaList.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
