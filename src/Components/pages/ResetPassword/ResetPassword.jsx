import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const handleSendEmail = async (values) => {
    setIsLoading(true);

    const request = axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
    try {
      const res = await toast.promise(
        request,
        {
          pending: "Reseting password 🔑",
          success: "Password reseted successfuly 🔑 🎉",
          error: "Error ❌",
        },
        { autoClose: 1500 }
      );
      setMessageError("");
      console.log(res);

      navigate("/login");
    } catch (err) {
      setMessageError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!").email("Invalid email"),
    newPassword: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters.")
      .max(15, "Password must be no more than 15 characters."),
  });

  const formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: handleSendEmail,
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-extrabold">Reset password</h1>
      <p className="text-slate-500 font-bold mt-3">
        Fill up the form to reset the password
      </p>
      {messageError && (
        <p className="font-bold mt-3 capitalize text-red-600 text-xl pt-4 text-center">
          {messageError}
        </p>
      )}

      <form className="my-10" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className=" text-slate-700 pb-2 font-semibold">Email address</p>
            <input
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm font-bold p-4">
                {formik.errors.email}
              </p>
            )}
          </label>

          <label htmlFor="newPassword">
            <p className=" text-slate-700 pb-2 font-semibold">
              Enter new Password
            </p>
            <input
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="newPassword"
              name="newPassword"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter new Password "
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm font-bold p-4">
                {formik.errors.newPassword}
              </p>
            )}
          </label>
          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-green-400 duration-300 hover:bg-main rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
                <span>Reset password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
