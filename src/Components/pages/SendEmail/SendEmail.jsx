import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const SendEmail = () => {
  const [error, setError] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendEmail = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      setError(false);
      setMessageEmail(data.message);
      navigate("/checkcode");
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!").email("Invalid email"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleSendEmail,
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-extrabold">Reset password</h1>
      <p className="text-slate-500 font-bold mt-3">
        Fill up the form to reset the password
      </p>
      {messageEmail && (
        <p className="text-red-600 text-xl text-center py-5 font-bold mt-3">
          {messageEmail} <i className="fa-solid fa-envelope"></i>
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
            {error && (
              <p className="text-red-500 text-sm font-bold p-4">
                Email is not vaild Go to{" "}
                <Link className="text-green" to={"/register"}>
                  Register now
                </Link>
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
                <span className="mr-1 font-medium">Enter Email</span>
                <i className="fa-solid fa-envelope"></i>
              </>
            )}
          </button>

          <p className="text-center">
            Not registered yet?{" "}
            <Link
              to="/register"
              className="text-green-400 duration-300 hover:text-main font-medium inline-flex space-x-1 items-center"
            >
              <span className="font-bold">Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
