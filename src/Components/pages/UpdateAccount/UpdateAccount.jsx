import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const UpdateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const handleUpdateData = async (values) => {
    setIsLoading(true);
    const request = axios.put(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      values,
      {
        headers: { token: token },
      }
    );
    try {
      const { data } = await toast.promise(
        request,
        {
          pending: "Updating Data...",
          success: "Data Updated successfully! ✈",
          error: "Failed To Update Data ❌",
        },
        { autoClose: 5000 }
      );

      formik.resetForm();
    } catch (err) {
      setErrorMessage(err.response.data.errors.msg);
    } finally {
      setIsLoading(false);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z\s]{3,15}$/,
        "The name must start with an uppercase letter and be followed by 3 to 15 lowercase letters."
      )
      .required("name is required !"),
    email: Yup.string().required("email is required !").email("invalid email "),
    phone: Yup.string()
      .matches(/^(\+02)?01[0125][0-9]{8}$/, "Enter number vaild ")
      .required("phone number is required !"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleUpdateData,
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-semibold capitalize">
        Update Your Account <i className="fa-solid fa-pen-to-square"></i>
      </h1>
      <p className="text-slate-500 font-bold">
        Fill up the form to Update Your Data{" "}
      </p>
      {errorMessage && (
        <p className="text-red-600 text-xl text-center py-5 font-bold mt-3">
          {errorMessage}
        </p>
      )}
      <form className="my-10" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="name">
            <p className="font-bold text-slate-700 pb-2 capitalize">name</p>
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="name"
              name="name"
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter name..."
            />
            {formik.errors.name && formik.touched.name && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold"
                role="alert"
              >
                {formik.errors.name}
              </div>
            )}
          </label>
          <label htmlFor="email">
            <p className="font-bold text-slate-700 pb-2 capitalize">email </p>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email..."
            />
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </label>
          <label htmlFor="phone">
            <p className="font-bold text-slate-700 pb-2 capitalize">phone </p>
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="phone"
              name="phone"
              type="tel"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter phone..."
            />
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-semibold"
              role="alert"
            >
              {formik.errors.phone}
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
                <span className="font-bold capitalize">Update Data</span>
                <i className="fa-solid fa-pen-to-square"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
