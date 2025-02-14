import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContext/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { whishListContext } from "../../Context/WishListContext/WishListContext";
import { orderContext } from "../../Context/OrderContext/OrderContext";

const Navbar = () => {
  const { userToken, setUserToken } = useContext(authContext);
  const navigate = useNavigate();
  const { numOfCartItems } = useContext(cartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { numberOfWishList } = useContext(whishListContext);
  const { numberOfOrders } = useContext(orderContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Logo" />
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <NavLink to="/" className="block py-2 px-4 hover:bg-gray-100">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="block py-2 px-4 hover:bg-gray-100"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className="block py-2 px-4 hover:bg-gray-100"
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className="block py-2 px-4 hover:bg-gray-100"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="block py-2 px-4 hover:bg-gray-100"
                >
                  Cart <i className="fa-solid fa-cart-shopping"></i>
                  <span className="ml-2 text-sm">({numOfCartItems})</span>
                </NavLink>
              </li>
              {!userToken ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <span
                    onClick={handleLogout}
                    className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="hidden md:flex md:items-center md:space-x-8">
          <ul className="flex space-x-8 font-medium">
            <li>
              <NavLink
                to="/"
                className="font-bold hover:text-main block py-2 px-3"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="font-bold hover:text-main block py-2 px-3"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className="font-bold hover:text-main block py-2 px-3"
              >
                Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="font-bold hover:text-main block py-2 px-3"
              >
                Brands
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="font-bold hover:text-main focus:outline-none duration-200"
          >
            Account <i className="fa-solid fa-user"></i> ▾
          </button>

          {dropdownOpen && (
            <ul className="absolute  right-0 mt-2 w-80 text-center bg-white border border-gray-200 rounded-md shadow-lg">
              {userToken && (
                <>
                  <li className="">
                    <NavLink
                      to="/cart"
                      className="block py-6 px-4   font-bold hover:bg-gray-100"
                    >
                      Cart{" "}
                      <i className="fa-solid fa-cart-shopping relative">
                        <span
                          className={`absolute -top-4 -right-4 text-xs font-semibold w-5 h-5 text-white rounded-full ${
                            numOfCartItems == 0 ? "!bg-red-600" : "bg-main"
                          } flex justify-center items-center`}
                        >
                          {numOfCartItems}
                        </span>
                      </i>
                      <span className="ml-2 text-sm">({numOfCartItems})</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wishlist"
                      className="block py-6 px-4 font-bold  hover:bg-gray-100"
                    >
                      Wish List{" "}
                      <i className="fa-solid fa-heart text-red-600 relative">
                        <span
                          className={`absolute -top-4 -right-4 text-xs font-semibold w-5 h-5 text-white rounded-full ${
                            numberOfWishList == 0 ? "!bg-red-600" : "bg-main"
                          } flex justify-center items-center`}
                        >
                          {numberOfWishList}
                        </span>
                      </i>
                      <span className="ml-2 text-sm">({numberOfWishList})</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/allorders"
                      className="block py-6 px-4 font-bold capitalize  hover:bg-gray-100"
                    >
                      orders{" "}
                      <i className="fa-solid fa-truck  relative">
                        <span
                          className={`absolute -top-4 -right-4 text-xs font-semibold w-5 h-5 text-white rounded-full ${
                            numberOfOrders == 0 ? "!bg-red-600" : "bg-main"
                          } flex justify-center items-center`}
                        >
                          {numberOfOrders}
                        </span>
                      </i>
                      <span className="ml-2 text-sm">({numberOfOrders})</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/update_account"
                      className="block py-6 px-4 font-bold  hover:bg-gray-100"
                    >
                      Update Account{" "}
                      <i className="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/change_my_password"
                      className="block py-6 px-4 font-bold  hover:bg-gray-100"
                    >
                      change password{" "}
                      <i className="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                  </li>
                </>
              )}
              {!userToken ? (
                <>
                  <li className="py-6 px-4">
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 font-bold "
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="py-6 px-4">
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 font-bold "
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="hover:text-red-600">
                  <span
                    onClick={handleLogout}
                    className="block py-6 px-4 font-bold  hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="mr-3  inline-block duration-200">
                      Logout
                    </span>
                    <i className="fa-solid fa-right-from-bracket text-red-600"></i>
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
