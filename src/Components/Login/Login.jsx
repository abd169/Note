import React from 'react'
import notesImg from "../../images/notes1.png";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Login() {

  let navigate = useNavigate()
  const [signUpMsg, setsignUpMsg] = useState()
  const [signUpFailedMsg, setsignUpFailedMsg] = useState()

  let validationShcema = yup.object({
    
    email: yup.string().email('Please Enter Valid email').required("email is required"),
    password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "password is invalid").required("password is requried"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      
    },
    validationSchema: validationShcema,
    // validate: function (values) {
    //   console.log(values);
    // },
    onSubmit: signIn

  })
  function signIn(values) {
    axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      .then((res) => {
        setsignUpMsg(res.data.msg);
        localStorage.setItem('userToken', res.data.token)
        navigate('/home')
      })
      .catch((error) => {
        setsignUpFailedMsg(error.response.data.msg)
      })
  }
  function clearMsgs() {
    setsignUpMsg("");
    setsignUpFailedMsg("");
  }

  return <>
    <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
      <i className="fa-regular fa-note-sticky text-info fs-2"></i>
      <p className="ps-2 fs-4 fw-bold">Notes</p>
    </li>
    <div className="container">
      <div className="row">
        <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          <img className="w-100 p-5" src={notesImg} alt="" />
        </div>

        <div className="col-lg-7">
          <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
            <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
              <h1 className="fw-bold">Sign Up Now</h1>
              <div className="pt-3">
                <form onSubmit={formik.handleSubmit}>
               
            
                  <input
                    onFocus={clearMsgs}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="form-control my-2"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                  />
                  {formik.touched.email ? <p>{formik.errors.email}</p> : null}
                  <input
                    onFocus={clearMsgs}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="form-control my-2"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                  />
                   {formik.touched.password? <p>{formik.errors.password}</p>: null }
            
                  <button
                    type="submit"
                    className="btn btn-info text-light w-100 rounded-2 mt-2"
                  >  Sign In
                  </button>
                  {signUpMsg?<p>{signUpMsg}</p>:null}
                  {signUpFailedMsg?<p>{signUpFailedMsg}</p>:null}
                </form>
                <p>Already Have Account ? Login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
