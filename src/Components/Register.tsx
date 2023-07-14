import React, { useState, useContext, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
function Register() {

  const { signup, state } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values: FormValues) => {

    signup(
      values.firstname,
      values.lastname,
      values.email,
      values.password
    )

  };
  interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }

  const initialValues: FormValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.firstname) {
      errors.firstname = 'First name is required';
    }

    if (!values.lastname) {
      errors.lastname = 'Last name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Wrong email format!';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }




    return errors;
  };

  return (
    <main>

      <div className="card formcard">
        <div className='heading'>
          <span className='headline-text'>Create an Account</span><br />
          <span>Already have an account ? <Link to="/login" className='link'>Log in</Link> </span>
        </div>


        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            <Form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <Field
                  type="text"
                  className="form-control inline"
                  placeholder='Type here'
                  id="inputEmail4"
                  name="firstname"

                />
                <ErrorMessage name="firstname" component="div" className="error" />

              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <Field
                  type="text"
                  className="form-control inline"
                  placeholder='Type here'
                  id="inputPassword4"
                  name="lastname"

                />
                <ErrorMessage name="lastname" component="div" className="error" />

              </div>
              <div className="col-12">
                <label className="form-label">Email Address</label>
                <Field
                  type="email"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Type your email address here"
                  name="email"

                />
                <ErrorMessage name="email" component="div" className="error" />
                <div className='error'>{state && state.error}</div>

              </div>
              <div className="col-12 password-input-container">
                <label className="form-label">Password</label>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  className="form-control password-input"
                  id="password"
                  name="password"
                  placeholder="Type your password here"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                  color='#999F9B'
                />

                <ErrorMessage name="password" component="div" className="error"></ErrorMessage>

              </div>

              <div className="col-12">
                <button className="submit-button">Sign Up</button>
              </div>
            </Form>

          </Formik>
        </div>
      </div>
    </main>


  );
}

export default Register;
