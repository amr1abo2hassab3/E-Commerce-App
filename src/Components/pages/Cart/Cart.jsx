import { Link } from "react-router-dom";
import { Loader } from "../../Loader/LoaderScreen";
import { useCart } from "./useCart";

export const Cart = () => {
  const {
    products,
    numOfCartItems,
    totalCartPrice,
    handleChangeCount,
    handleDeleteItem,
    handleDeleteAllProducts,
  } = useCart();

  if (!products) return <Loader />;

  return (
    <div className="container mx-auto p-5">
      {numOfCartItems ? (
        <>
          <div className="text-center my-6 text-2xl capitalize font-semibold flex justify-evenly  items-center">
            <div>
              <h3>
                your cart item (
                <span className="text-main text-xl">{numOfCartItems}</span>)
              </h3>
              <h4 className="my-5 text-xl">
                total cart price :{" "}
                <span className="text-red-600 text-lg">${totalCartPrice}</span>
              </h4>
            </div>
            <div>
              <button
                onClick={handleDeleteAllProducts}
                className="py-2 px-3 hover:!bg-red-600 bg-red-400 rounded-md text-white capitalize transition-all"
              >
                clear all items in cart{" "}
                <i className="fa-solid fa-trash text-white hover"></i>
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-16 md:w-32 max-w-full max-h-full"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            handleChangeCount(
                              product.product.id,
                              product.count - 1
                            );
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={product.count}
                            required
                            onChange={(e) => {
                              handleChangeCount(
                                product.product.id,
                                e.target.value
                              );
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            handleChangeCount(
                              product.product.id,
                              product.count + 1
                            );
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => {
                          handleDeleteItem(product.product.id);
                        }}
                        className="font-medium text-black-500 text-lg cursor-pointer border border-black rounded-md hover:border-red-600 p-2 hover:text-red-600 transition-colors"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to={"/cachorder"}
            className="w-full py-3 mt-5 font-medium text-white hover:text-white bg-indigo-500 duration-200 hover:bg-indigo-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <span className="font-bold capitalize"> go to create order</span>
            <i className="fa-solid fa-truck-fast"></i>
          </Link>
        </>
      ) : (
        <>
          <h3 className="  text-lg capitalize font-semibold text-center my-5">
            you cart is empity{" "}
          </h3>
          <Link
            to={"/"}
            className="text-center block transition-all py-3 px-4 bg-red-500 hover:bg-red-600 rounded-md text-white text-lg capitalize font-semibold"
          >
            no products in cart ❓ go to add products ➕🛒{" "}
          </Link>
        </>
      )}
    </div>
  );
};
