import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerThunk } from "../redux/auth/operations";
import { useState } from "react";
import * as Yup from "yup";

import { LuEye, LuEyeOff } from "react-icons/lu";

const nameRegExp = /[a-zA-Z0-9._-]*/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .min(3, "To short!")
    .max(30, "To long!")
    .matches(nameRegExp, "Only letters, numbers or dash"),

  email: Yup.string()
    .required("Required!")
    .matches(emailRegExp, "email@example.com"),

  password: Yup.string()
    .required("Required!")
    .min(8, "Password must be at least 8 characters long!"),
});

const Register = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, options) => {
    const credentials = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };

    dispatch(registerThunk(credentials))
      .unwrap()
      .then(() => navigate("/"));
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
          <legend className="fieldset-legend text-xl">Register</legend>
          <label className="fieldset-label">Name</label>
          <Field
            type="text"
            name="name"
            placeholder="Name"
            className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
            title="Only letters, numbers or dash"
          />
          <ErrorMessage
            className="text-gray-500"
            name="name"
            component="span"
          />

          <label className="fieldset-label">Email</label>
          <Field
            type="email"
            name="email"
            className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
            placeholder="Email"
            title="email@example.com"
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
              className=" input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
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
            Register
          </button>
          <p className="mt-4">You already have an account?</p>
          <Link to="/login" className="btn btn-soft btn-primary">
            Login
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
