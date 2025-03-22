import React, { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/loginSchema";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [loading, setLoading] = useState(false); // loading state

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true); // 🔹 Show loading state
      try {
        const response = await axios.post("http://localhost:4001/api/school/login", values);
        const token = response.headers.get("Authorization");
        if (token) {
          localStorage.setItem("token", token);
        }

        const user = response.data.user;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user)); 
        }
        toast.success("Login successful!", { autoClose: 3000 });
        formik.resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid credentials. Try again!", {
          autoClose: 3000,
        });
      } finally {
        setLoading(false); 
      }
    },
  });

  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center p-6">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#0D0E22]">
            Login to Your Account
          </h1>
        </div>

        {/* Right Section - Form */}
        <div className="w-full max-w-lg bg-[#0D0E22] p-6 rounded-lg shadow-md">
          <ToastContainer />

          <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 lg:p-3 rounded bg-[#23243D] text-white"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 lg:p-3 rounded bg-[#23243D] text-white"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
