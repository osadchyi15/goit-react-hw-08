import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import * as Yup from "yup";

import { loginThunk } from "../redux/auth/operations";

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required!")
    .matches(emailRegExp, "email@example.com"),

  password: Yup.string()
    .required("Required!")
    .min(8, "Password must be at least 8 characters long!"),
});

const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    const credentials = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    dispatch(loginThunk(credentials));
    options.resetForm();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-xl">Login</legend>
          <label className="fieldset-label">Email</label>
          <Field
            type="email"
            name="email"
            className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
            placeholder="Email"
          />
          <ErrorMessage
            className="text-gray-500"
            name="email"
            component="span"
          />

          <label className="fieldset-label">Password</label>
          <div className="relative flex items-center">
            <Field
              type={isEyeOpen ? "text" : "password"}
              className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
              name="password"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-4"
              onClick={() => setIsEyeOpen(!isEyeOpen)}
            >
              {isEyeOpen ? <LuEye /> : <LuEyeOff />}
            </button>
          </div>
          <ErrorMessage
            className="text-gray-500"
            name="password"
            component="span"
          />

          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
          <p className="mt-4">You do not have an account?</p>
          <Link to="/register" className="btn btn-soft btn-primary">
            Registration form
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
