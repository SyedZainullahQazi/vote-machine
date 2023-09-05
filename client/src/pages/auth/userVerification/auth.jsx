import { ToastContainer } from 'react-toastify';
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import * as Yup from "yup";

import { useAuth } from "../../../contexts/authContext/authContext";

import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from "react-bootstrap";
import "../../../styles/input/auth.css";
import {signupAPI,loginAPI} from "../../../apis/auth/authAPI";

export default function Auth(props) {
  const flag = props.flag;
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      let timeoutId;
      if (!flag) {
        timeoutId = setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        navigate("/dashboard");
        return; 
      }
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isLoggedIn, navigate, flag]); 
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cnic: "",
      image: "",
      userType: "voter",
    },
    validationSchema: flag
      ? Yup.object({
        password: Yup.string().min(3, "Must be 3 Chars").required("Required"),
        cnic: Yup.string()
          .matches(/^\d{13}$/, "CNIC must be exactly 13 digits")
          .required("Required"),
      })
      : Yup.object({
        name: Yup.string().min(3, "Must be 3 Chars").required("Tis Required"),
        email: Yup.string().min(3, "Must be 3 Chars").required("Required"),
        password: Yup.string().min(3, "Must be 3 Chars").required("Required"),
        cnic: Yup.string()
          .matches(/^\d{13}$/, "CNIC must be exactly 13 digits")
          .required("Required"),
      }),
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSignup = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("cnic", values.cnic);
    formData.append("userType", values.userType);
    formData.append("image", values.image);

    try {
      const token = await signupAPI(formData);
  
      if (token) {
        login(token);
      }
    } catch (error) {
    }
  };

  const handleLogin = async (values) => {
    const loginData = {
      cnic: values.cnic,
      password: values.password,
    };

    try {
      const token = await loginAPI(loginData);
  
      if (token) {
        login(token);
      }
    }catch(error)
    {
    }
  };

  const handleSubmit = (values) => {
    if (flag) {
      handleLogin(values);
    } else {
      handleSignup(values);
    }
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  const nameInput = (flag) => {
    if (!flag) {
      return (
        <div>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control"
            id="name"
            name="name"
            autoComplete="off"
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <p>{formik.errors.name}</p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
      );
    }
    return <></>;
  };

  const emailInput = () => {
    if (!flag) {
      return (
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control"
            id="email"
            name="email"
            autoComplete="off"
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
      );
    }
    return <></>;
  };

  const imageInput = (flag) => {
    if (!flag) {
      return (
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            id="image"
            name="image"
            className="form-control"
            onBlur={formik.handleBlur}
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
      );
    }
    return <></>;
  };

  return (
    <>
      <div className="main-wrapper row justify-content-center align-items-center">
      <ToastContainer/>
        <div className="col-5 inner-wrapper text-center">
          <h2 className="vote-text">VM{flag?" - LOGIN":" SIGNUP"}</h2>
          <Form onSubmit={formik.handleSubmit}>
            {/* Name */}
            {nameInput(flag)}
            {/* CNIC */}
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
            {/* Email */}
            {emailInput(flag)}
            {/* Password */}
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="form-control"
              autoComplete="off"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
            {/* image */}
            {imageInput(flag)}
            {/* Link */}
            <div className="row justify-content-center div-wrapper">
              {flag ? (
                <Link to="/signup" className="signin">
                  SignUp Instead
                </Link>
                ) : (
                <Link to="/" className="signin">
                  Login Yourself
                </Link>
                )}
            </div>
            {/* submit button */}
            <Button variant="outline-light" type="submit" className="submit-btn">
              {flag?"LOGIN NOW":"SIGNUP NOW"}
            </Button>{" "}
          </Form>
          {flag?<Link to="/reset-password" className="signin">forgot password?</Link>:<></>}
        </div>
        
      </div>
    </>
  );
}
