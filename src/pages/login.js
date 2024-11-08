import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Yup Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (user) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/v1/login`,
          user
        );

        if (response?.data?.success) {
          setErrorMessage("");
          const { token, data: userData } = response.data;
          login({ token, userData });
          router.push("/"); // Ensure redirection only if login is successful
        } else {
          setErrorMessage(
            response?.data?.message || "Invalid login credentials"
          );
        }
      } catch (err) {
        console.error("Login error", err);
        setErrorMessage("Something went wrong. Please try again later.");
      }
    },
  });

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg border border-gray-600 p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          User Login
        </h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4 text-black">
          {/* Display error message */}
          {errorMessage && (
            <div className="text-red-600 text-center mb-4">{errorMessage}</div>
          )}

          {/* Username Field */}
          <div className="h-24">
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your Username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.username}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="h-24">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your Password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>

          {/* Link to Register */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              New User?{" "}
              <Link
                href="/register"
                className="text-indigo-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
