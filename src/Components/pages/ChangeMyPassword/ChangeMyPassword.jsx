import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { authContext } from "../../../Context/AuthContext/AuthContext";

export const ChangeMyPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken, userToken } = useContext(authContext);

  const changePassword = async (values) => {
    setIsLoading(true);
    const request = axios.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      values,
      {
        headers: { token: userToken },
      }
    );
    try {
      const { data } = await toast.promise(
        request,
        {
          pending: "changing password...",
          success: "password changed successfully! ✈",
          error: "Failed To change password ❌",
        },
        { autoClose: 5000 }
      );
      formik.resetForm();
      localStorage.setItem("token", data.token);
      setUserToken(data.token);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Password is required !")
      .min(6, "The password must contain at least 6 characters.")
      .max(15, "The password must contain no more than 15 characters."),
    password: Yup.string()
      .required("Password is required !")
      .min(6, "The password must contain at least 6 characters.")
      .max(15, "The password must contain no more than 15 characters."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "The password does not match !")
      .required("Password confirmation is required. !"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: changePassword,
    validationSchema,
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-semibold capitalize">
        change Your password
      </h1>
      <p className="text-slate-500 font-bold">
        Fill up the form to Change Your Password{" "}
      </p>

      <form className="my-10" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="currentPassword">
            <p className="font-bold text-slate-700 pb-2 capitalize">
              current Password
            </p>
            <input
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter currentPassword..."
            />
            {formik.errors.currentPassword &&
              formik.touched.currentPassword && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold"
                  role="alert"
                >
                  {formik.errors.currentPassword}
                </div>
              )}
          </label>
          <label htmlFor="password">
            <p className="font-bold text-slate-700 pb-2 capitalize">
              new password{" "}
            </p>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              name="password"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter password..."
            />
            {formik.errors.password && formik.touched.password && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold"
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}
          </label>
          <label htmlFor="rePassword">
            <p className="font-bold text-slate-700 pb-2 capitalize">
              re Password{" "}
            </p>
            <input
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="rePassword"
              name="rePassword"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter rePassword..."
            />
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-3 font-medium cursor-pointer text-white bg-green-500 duration-200 hover:bg-main rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center`}
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
                <span className="font-bold capitalize">change Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
