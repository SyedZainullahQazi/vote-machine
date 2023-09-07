import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {Form} from "react-bootstrap"
import { GetUser } from "../../apis/general/getuserdetailsAPI";
import Navbar from "../../components/navbar/navbar";
import updateCandidateStatusAPI from "../../apis/user/applyAsCandidateAPI";

export default function ApplyAsCandidate() {
  const [userDetails, setUserDetails] = useState();
  const [stateUpdate, setStateUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUser(localStorage.getItem("jwtToken"));
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [stateUpdate]);

  const formik = useFormik({
    initialValues: {
      partyName: "",
      image: "",
      appliedAsCandidate: true,
    },
    validationSchema: Yup.object({
      partyName: Yup.string().min(3, "Must be 3 Chars").required("Required"),
      image: Yup.mixed()
      .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; 
      const supportedFormats = ["image/jpeg", "image/png", "image/gif","image/jpg","image/webp"];
      return supportedFormats.includes(value.type);
      })
    }),
    onSubmit: async (values) => {
      handleApplyForCandidate(values);
    },
  });

  const handleApplyForCandidate = async (values) => {
    const formData = new FormData();
    formData.append("partyName", values.partyName);
    formData.append("image", values.image);
    formData.append("appliedAsCandidate",values.appliedAsCandidate);
    formData.append("id",userDetails.id)
    try {
      await updateCandidateStatusAPI(formData,localStorage.getItem("jwtToken"));

      setTimeout(()=>{
        stateUpdate ? setStateUpdate(false) : setStateUpdate(true);
      },500);
    } catch (error) {
    }
  };

  const handleFileChange = (event) => {
  formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="">
      <Navbar />
      <ToastContainer />
      <div className="row justify-content-center d-flex container">
      <div className="content col-6">
        {userDetails ? (
          userDetails.appliedAsCandidate? (
            <h1>Already Applied For Candidate</h1>
          ) : (
            <Form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Party Name"
                  onChange={formik.handleChange}
                  value={formik.values.partyName}
                  className="form-control"
                  autoComplete="off"
                  id="partyName"
                  name="partyName"
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.partyName && formik.errors.partyName ? (
                  <p>{formik.errors.partyName}</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="image"
                  name="image"
                  className="form-control"
                  onBlur={formik.handleBlur}
                  accept=".png, .jpg, .jpeg .webp"
                  required
                />
                {formik.touched.image && formik.errors.image ? (
                  <p>{formik.errors.image}</p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>
              <div>
                <button
                  className="btn btn-outline-success submit-btn"
                  type="submit"
                >
                  APPLY AS CANDIDATE FOR ELECTIONS
                </button>
              </div>
            </Form>
          )
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
      </div>
    </div>
  );
  
}
