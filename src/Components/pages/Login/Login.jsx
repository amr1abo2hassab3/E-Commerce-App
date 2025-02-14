import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserToken, setRoleUser, setUserName } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      setUserToken(data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("token", data.token);
      navigate("/");
      toast.info(`Hello ${data.user.name} 👋!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        icon: false,
      });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!").email("Invalid email"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters.")
      .max(15, "Password must be no more than 15 characters."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex items-start mt-28 justify-center p-4">
      <div className="max-w-[600px] w-full  bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign In
        </h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold">
              {errorMessage}
            </div>
          )}

          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
              placeholder="your@email.com"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-600 mt-1 font-bold">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="!mb-10">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
              placeholder="••••••••"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-600 mt-1 font-bold">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-main focus:ring-main"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to={"/sendemail"}
              className="text-sm text-red-600 duration-300 hover:text-main font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 duration-300 hover:bg-main text-white font-medium py-2.5 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 font-bold">
          Don't have an account?
          <Link
            to={"/register"}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
