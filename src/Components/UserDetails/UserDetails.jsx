import { useContext } from "react";
import { authContext } from "../../Context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { BtnShop } from "../BtnShop/BtnShop";

export const UserDetails = ({ numberOfOrders }) => {
  const { email, userData } = useContext(authContext);

  return (
    <div className="bg-gray-50  dark:bg-gray-800 w-full  flex justify-between items-center md:items-start  xl:w-full px-4 py-6 md:p-6 xl:p-8 mb-5 flex-col">
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
        My Account <i className="fa-solid fa-user pl-2 text-main"></i>
      </h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                {userData.name}
              </p>
              <p className="text-sm  dark:text-gray-300 leading-5 text-gray-600">
                <span className="font-bold text-main"> {numberOfOrders}</span>
                Previous Orders
              </p>
            </div>
          </div>
          <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 7L12 13L21 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="cursor-pointer text-sm leading-5 ">{email}</p>
          </div>
        </div>
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                Shipping Address
              </p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                180 North King Street, Northhampton MA 1060
              </p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                Billing Address
              </p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                180 North King Street, Northhampton MA 1060
              </p>
            </div>
          </div>
          <div className="flex mt-2 w-full justify-center items-center md:justify-start md:items-start">
            <BtnShop to={"/update_account"} name={"Edit Details"} />
          </div>
        </div>
      </div>
    </div>
  );
};
