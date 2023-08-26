import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';


import { useAuth } from "../../../contexts/authContext/authContext";
import { sendResetPasswordEmail,resetPassword } from "../../../apis/auth/resetpassAPI";

import { Form, Button } from "react-bootstrap";
import "../../../styles/input/auth.css";
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword(props) {
  //flag=false forgetPassword Component
  //flag=true updatePassword Component
  const flag=props.flag;
 
  const navigate=useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    // Check if the user is logged in and navigate to "/dashboard" if true
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate, props.flag]); // This effect runs whenever isLoggedIn or navigate changes

  const formik = useFormik({
    initialValues: {
      cnic: "",
      newPassword:"",
      OTP:"",
    },

    validationSchema:flag
      ? Yup.object({
        newPassword: Yup.string().min(3, "Must be 3 Chars").required("Required"),
        OTP:Yup.string().min(12,"Must be 12 Chars").required("Required"),
      })
      :
      Yup.object({
        cnic: Yup.string()
          .matches(/^\d{13}$/, "CNIC must be exactly 13 digits")
          .required("Required"),
      }),
    onSubmit: async (values) => {
      if(!flag)
      {
        sendEmailToCnic(values);
      }
      else
      {
        resetPasswordNow(values);
      }
     
    },
  });

  const sendEmailToCnic = async (values) => {
    try {
      const response = await sendResetPasswordEmail(values.cnic);
  
      if (response.status === 200) {
        toast.success("Email Sent Successfully", { theme: "dark" });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, { theme: 'dark' });
  
      } else {
        toast.error('An error occurred', { theme: 'dark' });
      }
    }
  };

  const resetPasswordNow = async (values) => {
    try {
      const response = await resetPassword(values.OTP,values.newPassword);
  
      if (response.status === 200) {
        toast.success("Password Updated Successfully", { theme: "dark" });
        setTimeout(() => {
          navigate('/');
        }, 4000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, { theme: 'dark' });
      } else {
        toast.error('An error occurred', { theme: 'dark' });
        setTimeout(() => {
          navigate('/');
        }, 4000);
      }
    }
  };

  const passwordInput=(flag)=>{
    if(flag)
    {
      return(
          <div>
            <input
            type="password"
            placeholder="Enter Your Password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            className="form-control"
            autoComplete="off"
            id="newPassword"
            name="newPassword"
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <p>{formik.errors.newPassword}</p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
      )
    }
    return (<></>);
  }

const cnicInput=(flag)=>{
  if(!flag)
  {
    return(<div>
      <input
              type="text"
              placeholder="Enter Your CNIC"
              onChange={formik.handleChange}
              value={formik.values.cnic}
              className="form-control"
              autoComplete="off"
              id="cnic"
              name="cnic"
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.cnic && formik.errors.cnic ? (
              <p>{formik.errors.cnic}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
    </div>);
  }
  return(<></>)
}

const OTPInput=(flag)=>{
  if(flag)
  {
    return(
        <div>
          <input
          type="text"
          placeholder="Enter Your OTP Code"
          onChange={formik.handleChange}
          value={formik.values.OTP}
          className="form-control"
          autoComplete="off"
          id="OTP"
          name="OTP"
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.OTP && formik.errors.OTP ? (
          <p>{formik.errors.OTP}</p>
        ) : (
          <p>
            <br />
          </p>
        )}
      </div>
    )
  }
  return (<></>);
}

  return (
    <>
      <ToastContainer/>
      <div className="main-wrapper row justify-content-center align-items-center">
        <div className="col-5 inner-wrapper text-center">
          <h2 className="vote-text">RESET PASSWORD</h2>
          <Form onSubmit={formik.handleSubmit}>
            {/* CNIC */}
            {cnicInput(flag)}
            {OTPInput(flag)}
            {passwordInput(flag)}
            {/* submit button */}
            <Button variant="outline-light" type="submit" className="submit-btn">
              {flag?"RESET PASSWORD":"SEND EMAIL"}
            </Button>{" "}
          </Form>
        </div>
        
      </div>
    </>
  );
}
