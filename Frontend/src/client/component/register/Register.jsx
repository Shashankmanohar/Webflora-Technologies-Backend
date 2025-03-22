import React, { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const addImage = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      if (uploadedFile.size > 2 * 1024 * 1024) {
        // Limit file size to 2MB
        toast.error("Image size must be less than 2MB.");
        return;
      }
      setImageUrl(URL.createObjectURL(uploadedFile));
      setFile(uploadedFile);
      formik.setFieldValue("school_image", uploadedFile);
    }
  };

  const initialValues = {
    school_name: "",
    email: "",
    owner_name: "",
    password: "",
    confirm_password: "",
    school_image: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("school_name", values.school_name);
      formData.append("email", values.email);
      formData.append("owner_name", values.owner_name);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);
      if (file) {
        formData.append("school_image", file);
      }

      try {
        await axios.post("http://localhost:4001/api/school/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("School registered successfully!", { autoClose: 3000 });
        formik.resetForm();
        setFile(null);
        setImageUrl(null);
      } catch (error) {
        if (error.response?.status === 409) {
          formik.setFieldError("email", "Email is already registered!");
        }
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.", {
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
            Register Your School
          </h1>
        </div>

        {/* Right Section - Form */}
        <div className="w-full max-w-lg bg-[#0D0E22] p-6 rounded-lg shadow-md">
          <ToastContainer />

          <label className="block font-semibold mb-2 text-gray-400">Add School Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={addImage}
            className="mb-4 lg:p-3 p-2 w-full rounded bg-[#23243D] text-white"
          />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded Preview"
              className="w-full max-w-sm h-40 object-cover rounded-lg mx-auto mb-4"
            />
          )}

          <form className="w-full flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="school_name"
              placeholder="School Name"
              className="p-2 lg:p-3 rounded bg-[#23243D] text-white"
              {...formik.getFieldProps("school_name")}
            />
            {formik.touched.school_name && formik.errors.school_name && (
              <p className="text-red-500 text-sm">{formik.errors.school_name}</p>
            )}

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
              type="text"
              name="owner_name"
              placeholder="Owner Name"
              className="p-2 lg:p-3 rounded bg-[#23243D] text-white"
              {...formik.getFieldProps("owner_name")}
            />
            {formik.touched.owner_name && formik.errors.owner_name && (
              <p className="text-red-500 text-sm">{formik.errors.owner_name}</p>
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

            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="p-2 lg:p-3 rounded bg-[#23243D] text-white"
              {...formik.getFieldProps("confirm_password")}
            />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <p className="text-red-500 text-sm">{formik.errors.confirm_password}</p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
