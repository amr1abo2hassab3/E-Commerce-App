import { ProductsOrder } from "../ProductsOrder/ProductsOrder";
import { UserDetails } from "../UserDetails/UserDetails";
import { useState } from "react";

export const OrderDetails = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(order.createdAt);
  const products = order?.cartItems;

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-start item-start space-y-2 mt-12 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order : {order.id}
        </h1>
        <p className="text-base dark:text-gray-300 font-bold  leading-6 text-gray-600">
          {date.toLocaleString()}{" "}
        </p>
      </div>
      <div className="mt-5 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex duration-500 p-6 bg-[#C7D5F1] rounded-lg flex-col h-fit justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Subtotal
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    ${order.totalOrderPrice}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Shipping
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    ${order.shippingPrice}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    tax Price
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    ${order.taxPrice}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  $
                  {order.totalOrderPrice + order.taxPrice + order.shippingPrice}{" "}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  is paid
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  <span
                    className={`font-bold ${
                      order.isPaid ? "text-main" : "text-red-600"
                    }`}
                  >
                    {order.isPaid ? "YES" : "NO"}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  payment Method Type
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  <span className={`font-bold text-main`}>
                    {" "}
                    {order.paymentMethodType}
                    {order.paymentMethodType == "cash" && (
                      <i className="fa-solid fa-sack-dollar pl-2"></i>
                    )}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center capitalize w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  user
                </p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  <span className={`font-bold  capitalize`}>
                    {order.user.name}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img
                      className="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                  ${order.shippingPrice}
                </p>
              </div>
              <div className="w-full ">
                <p className="capitalize py-1 flex justify-between items-center w-full">
                  {" "}
                  <span className="font-semibold">is Delivered : </span>
                  <span
                    className={`font-bold ${
                      order.isDelivered ? "text-main" : "text-red-600"
                    }`}
                  >
                    {order.isDelivered ? "YES" : "NO"}
                  </span>
                </p>
              </div>
              <h3 className="font-semibold capitalize text-red-400">
                {" "}
                shipping Address :
              </h3>
              <div className="flex justify-between items-center w-full capitalize">
                <p className="text-base font-semibold dark:text-white leading-4 text-gray-800">
                  City :
                </p>
                <p className="text-base font-semibold dark:text-gray-300 leading-4 text-gray-600">
                  {order.shippingAddress.city}
                </p>
              </div>
              <div className="flex justify-between items-center w-full capitalize">
                <p className="text-base font-semibold dark:text-white leading-4 text-gray-800">
                  Address :
                </p>
                <p className="text-base font-semibold  dark:text-gray-300 leading-4 text-gray-600">
                  {order.shippingAddress.details}
                </p>
              </div>
              <div className="flex justify-between items-center w-full capitalize">
                <p className="text-base font-semibold dark:text-white leading-4 text-gray-800">
                  phone comunication :
                </p>
                <p className="text-base font-semibold  dark:text-gray-300 leading-4 text-gray-600">
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleOpenMenu}
            className="capitalize font-semibold bg-green-400 hover:bg-main duration-300 text-white p-3 w-full mb-0"
          >
            {isOpen ? (
              <>
                hidden ordered products{" "}
                <i className="fa-solid fa-chevron-up pl-2 text-lg"></i>
              </>
            ) : (
              <>
                show ordered products{" "}
                <i className="fa-solid fa-chevron-down px-2 text-lg"></i>
              </>
            )}
            <span className="text-red-600"> ( {products?.length} )</span>
          </button>
          <ProductsOrder isOpen={isOpen} products={products} />
        </div>
      </div>
    </>
  );
};
