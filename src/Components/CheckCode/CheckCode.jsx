import axios from "axios";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CheckCode = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();

  const handleCheckCode = async () => {
    setIsLoading(true);

    const request = axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        resetCode: otp,
      }
    );
    try {
      const res = await toast.promise(
        request,
        {
          pending: "Chicking pin code..",
          success: "Reset code is invalid 🎉",
          error: "Reset code is invalid or has expired❌",
        },
        { autoClose: 1500 }
      );
      setMessageError("");
      navigate("/resetpassword");
    } catch (err) {
      setMessageError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (value) => {
    setOtp(value);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-extrabold">Reset password</h1>
      <p className="text-slate-500 font-bold mt-3">
        Fill up the form to reset the password
      </p>
      <p className="font-bold mt-3 capitalize text-red-600 text-xl pt-4 text-center">
        Reset code sent to your email
      </p>
      <form
        className="my-10"
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckCode(e);
        }}
      >
        <div className="flex flex-col space-y-5">
          <div className="text-center flex flex-col items-center">
            <h2 className="font-semibold text-xl p-4 ">Enter your pin code</h2>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props, index) => (
                <input
                  {...props}
                  style={{
                    width: "4rem",
                    height: "4rem",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    marginLeft: "8px",
                    border: otp[index] ? "1px solid green" : "1px solid red",
                    borderRadius: "5px",
                    transition: "border 0.2s ease-in-out",
                  }}
                />
              )}
            />
          </div>
          {messageError && (
            <p className="font-bold mt-3 capitalize text-red-600 text-xl pt-4 text-center">
              {messageError}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 font-bold  text-white bg-green-400 duration-300 hover:bg-main rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                check code <i className="fa-solid fa-check-double ml-4"></i>
                <i className="fa-solid fa-plane-departure"></i>
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
