import axios from "axios";
import { useFormik } from "formik";
import { useState, useCallback } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [status, setStatus] = useState("");
  const [errorClass, setErrorClass] = useState("");

  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema, // Apply validation schema
    onSubmit: useCallback((user) => {
      axios
        .post(`http://localhost:7000/api/auth/v1/register`, user)
        .then(() => {
          // Show success toast notification
          toast.success("Registered Successfully!", {
            position: "top-right", // Customize the position
            autoClose: 5000, // Time duration before auto-hide
            hideProgressBar: true, // Hide progress bar
            closeOnClick: true, // Close on click
            pauseOnHover: true, // Pause when hovered
            draggable: true, // Allow dragging
          });

          // Redirect after success
          router.push("/login");
        })
        .catch((error) => {
          setStatus(error.response?.data?.message || "Registration failed");
          setErrorClass("text-red-500");
        });
    }, []),
  });

  return (
    <div className="flex items-start justify-center bg-white px-6 font-roboto">
      <div className="bg-white shadow-xl rounded-lg p-4 border border-gray-600 focus:ring-indigo-500 w-full max-w-lg mt-10 border m-auto">
        <h2 className="text-2xl font-semibold text-center text-indigo-600">
          Create your account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <div className="h-20">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-black"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="w-full px-4 py-2 border-gray-3000 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            ) : null}
          </div>

          <div className="h-20">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-black"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            ) : null}
          </div>

          <div className="h-20">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black"
            >
              User Name
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            ) : null}
          </div>

          <div className="h-20">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email-Id
            </label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="h-20">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>

          {status && <p className={`text-center ${errorClass}`}>{status}</p>}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
