import { useContext, useState } from "react";
import { cartContext } from "../../../Context/CartContext";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const CachOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [byCash, setByCash] = useState(true);
  const { cartId, numOfCartItems, resetValues } = useContext(cartContext);
  const token = localStorage.getItem("token");
  const totalOrderPrice = detailsOrder?.data.totalOrderPrice;
  const navigate = useNavigate();
  const QueryClient = useQueryClient();

  const handleNavigate = (to, second) => {
    setTimeout(() => {
      navigate(to);
    }, second);
  };
  const createCachOrder = async (values) => {
    if (numOfCartItems !== 0) {
      setIsLoading(true);
      const request = axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        {
          headers: {
            token: token,
          },
        }
      );

      try {
        const { data } = await toast.promise(
          request,
          {
            pending: "Creating Cach Order...",
            success: "Order created successfully! ✈",
            error: "Failed To Create This Order! ❌",
          },
          { autoClose: 5000 }
        );
        setDetailsOrder(data);
        QueryClient.invalidateQueries(["getUserOrders"]);
        resetValues();
        handleNavigate("/", 4000);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Your Cart Is Empity Go to add product in Your Cart");
      handleNavigate("/", 2000);
    }
  };

  const createCheckOutOrder = async (values) => {
    if (numOfCartItems !== 0) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
          { shippingAddress: values },
          {
            headers: {
              token: token,
            },
          }
        );
        console.log(data);
        window.open(data.session.url);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        resetValues();
      }
    } else {
      toast.error("Your Cart Is Empity Go to add product in Your Cart");
      handleNavigate("/", 4000);
    }
  };

  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(5, "details must be at last 5 characters")
      .required("Details is required"),
    phone: Yup.string()
      .matches(/^(\+02)?01[0125][0-9]{8}$/, "Enter number vaild ")
      .required("phone is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: function (values) {
      if (byCash) {
        createCachOrder(values);
      } else {
        createCheckOutOrder(values);
      }
    },
    validationSchema,
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow shadow-slate-300 dark:shadow-gray-700 dark:text-white">
      <h1 className="text-4xl font-semibold capitalize">create order</h1>
      <p className="text-slate-500 dark:text-gray-300 font-bold">
        Fill up the form to create order{" "}
        <i className="fa-solid fa-money-bill-1"></i>
      </p>
      {numOfCartItems === 0 && (
        <p className="text-red-600 dark:text-red-400 text-xl text-center py-5 capitalize font-bold mt-3">
          Your Cart Is Empty, Go to add product in your cart{" "}
          <i className="fa-solid fa-cart-plus"></i>
        </p>
      )}
      {totalOrderPrice && (
        <>
          <p className="text-red-600 dark:text-red-400 text-xl text-center py-5 font-bold mt-3">
            Total order : ${totalOrderPrice}
          </p>
          <p className="capitalize text-center pl-2 font-bold dark:text-gray-300">
            One of our customers{" "}
            <i className="fa-solid fa-person-military-pointing"></i> will
            communicate <i className="fa-solid fa-phone-volume"></i> with you
            soon <i className="fa-solid fa-truck-fast"></i>
          </p>
        </>
      )}
      <form className="my-10" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="details">
            <p className="font-bold text-slate-700 dark:text-gray-300 pb-2 capitalize">
              details{" "}
            </p>
            <input
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="details"
              name="details"
              type="text"
              className="w-full py-3 border border-slate-200 dark:border-gray-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-700 dark:text-white"
              placeholder="Enter details..."
            />
          </label>
          {formik.errors.details && formik.touched.details && (
            <div
              className="p-4 mb-4 text-sm text-red-800 dark:text-red-500 rounded-lg bg-red-50 dark:bg-red-900 font-semibold"
              role="alert"
            >
              {formik.errors.details}
            </div>
          )}
          <label htmlFor="phone">
            <p className="font-bold text-slate-700 dark:text-gray-300 pb-2 capitalize">
              phone{" "}
            </p>
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="phone"
              name="phone"
              type="tel"
              className="w-full py-3 border border-slate-200 dark:border-gray-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-700 dark:text-white"
              placeholder="Enter phone..."
            />
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="p-4 mb-4 text-sm text-red-800 dark:text-red-500 rounded-lg bg-red-50 dark:bg-red-900 font-semibold"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          )}
          <label htmlFor="city">
            <p className="font-bold text-slate-700 dark:text-gray-300 pb-2 capitalize">
              city{" "}
            </p>
            <input
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="city"
              name="city"
              type="text"
              className="w-full py-3 border border-slate-200 dark:border-gray-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-700 dark:text-white"
              placeholder="Enter city..."
            />
          </label>
          {formik.errors.city && formik.touched.city && (
            <div
              className="p-4 mb-4 text-sm text-red-800 dark:text-red-500 rounded-lg bg-red-50 dark:bg-red-900 font-semibold"
              role="alert"
            >
              {formik.errors.city}
            </div>
          )}
          <button
            onClick={() => {
              setByCash(true);
            }}
            type="submit"
            className={`w-full py-3 font-medium ${
              numOfCartItems == 0 ? "cursor-not-allowed" : "cursor-pointer"
            } text-white bg-indigo-500 duration-200 hover:bg-indigo-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center`}
          >
            {isLoading && byCash ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <span className="font-bold capitalize">create order cash</span>
                <i className="fa-solid fa-wallet"></i>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setByCash(false);
            }}
            type="submit"
            className={`w-full py-3 font-medium ${
              numOfCartItems == 0 ? "cursor-not-allowed" : "cursor-pointer"
            } text-white bg-indigo-500 duration-200 hover:bg-indigo-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center`}
          >
            {isLoading && !byCash ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <span className="font-bold capitalize">
                  payment through visa
                </span>
                <i className="fa-brands fa-cc-visa"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
