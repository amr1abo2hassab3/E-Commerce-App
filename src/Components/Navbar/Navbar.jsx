import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "os");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    handleChangeMode(mode);
  }, [mode]);

  const handleChangeMode = (mode) => {
    localStorage.setItem("mode", mode);
    setMode(mode);

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const isDarkPreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", isDarkPreferred);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex relative items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          <div className="absolute -right-11  flex size-6 flex-none items-center justify-center rounded-md  dark:bg-gray-900 bg-white ring-1 shadow-sm ring-slate-900/10 p-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <div className="flex size-6 flex-none items-center justify-center rounded-md dark:bg-gray-500 ring-1 shadow-sm ring-slate-900/10">
                {mode === "os" && (
                  <svg className="size-4 fill-slate-400">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#38BDF8"
                      d="M1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.5l.31 1.242c.084.333.36.573.63.808.091.08.182.158.264.24A1 1 0 0 1 11 15H5a1 1 0 0 1-.704-1.71c.082-.082.173-.16.264-.24.27-.235.546-.475.63-.808L5.5 11H4a3 3 0 0 1-3-3V4Zm3-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                    />
                  </svg>
                )}
                {mode === "light" && (
                  <svg className="size-4 fill-slate-400">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 1C7 0.447715 7.44772 0 8 0C8.55228 0 9 0.447715 9 1V2C9 2.55228 8.55228 3 8 3C7.44772 3 7 2.55228 7 2V1ZM11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8ZM13.6563 2.34285C13.2658 1.95232 12.6326 1.95232 12.2421 2.34285L11.535 3.04996C11.1445 3.44048 11.1445 4.07365 11.535 4.46417C11.9255 4.85469 12.5587 4.85469 12.9492 4.46417L13.6563 3.75706C14.0469 3.36654 14.0469 2.73337 13.6563 2.34285ZM12.242 13.6563L11.5349 12.9492C11.1443 12.5587 11.1443 11.9255 11.5349 11.535C11.9254 11.1445 12.5585 11.1445 12.9491 11.535L13.6562 12.2421C14.0467 12.6326 14.0467 13.2658 13.6562 13.6563C13.2656 14.0468 12.6325 14.0468 12.242 13.6563ZM16 7.99902C16 7.44674 15.5523 6.99902 15 6.99902H14C13.4477 6.99902 13 7.44674 13 7.99902C13 8.55131 13.4477 8.99902 14 8.99902H15C15.5523 8.99902 16 8.55131 16 7.99902ZM7 14C7 13.4477 7.44772 13 8 13C8.55228 13 9 13.4477 9 14V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V14ZM4.46492 11.5352C4.0744 11.1447 3.44123 11.1447 3.05071 11.5352L2.3436 12.2423C1.95307 12.6329 1.95307 13.266 2.3436 13.6566C2.73412 14.0471 3.36729 14.0471 3.75781 13.6566L4.46492 12.9494C4.85544 12.5589 4.85544 11.9258 4.46492 11.5352ZM4.46477 3.04973C4.85529 3.44025 4.85529 4.07342 4.46477 4.46394C4.07424 4.85447 3.44108 4.85447 3.05055 4.46394L2.34345 3.75684C1.95292 3.36631 1.95292 2.73315 2.34345 2.34262C2.73397 1.9521 3.36714 1.9521 3.75766 2.34262L4.46477 3.04973ZM3 8C3 7.44772 2.55228 7 2 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H2C2.55228 9 3 8.55228 3 8Z"
                      fill="#38BDF8"
                    />
                  </svg>
                )}
                {mode === "dark" && (
                  <svg className="size-4 fill-slate-400">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#38BDF8"
                      d="M7.23 3.333C7.757 2.905 7.68 2 7 2a6 6 0 1 0 0 12c.68 0 .758-.905.23-1.332A5.989 5.989 0 0 1 5 8c0-1.885.87-3.568 2.23-4.668ZM12 5a1 1 0 0 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 2 1 1 0 0 0-1 1 1 1 0 1 1-2 0 1 1 0 0 0-1-1 1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 1-1Z"
                    />
                  </svg>
                )}
              </div>
            </button>
            {isDarkMode && (
              <div className="absolute dark:bg-gray-800 dark:text-white top-9 left-0 bot pointer-events-auto w-36 space-y-1 rounded-lg bg-white p-3 text-[0.8125rem]/6 font-medium text-slate-700 ring-1 shadow-xl shadow-black/5 ring-slate-700/10">
                <div
                  onClick={() => {
                    handleChangeMode("light");
                  }}
                  className={`flex cursor-pointer ${
                    mode == "light" && "bg-slate-900 text-slate-50"
                  } rounded-[10px] p-1`}
                >
                  <div className="flex size-6 flex-none items-center justify-center rounded-md bg-white ring-1 shadow-sm ring-slate-900/10">
                    <svg className="size-4 fill-slate-400">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 1C7 0.447715 7.44772 0 8 0C8.55228 0 9 0.447715 9 1V2C9 2.55228 8.55228 3 8 3C7.44772 3 7 2.55228 7 2V1ZM11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8ZM13.6563 2.34285C13.2658 1.95232 12.6326 1.95232 12.2421 2.34285L11.535 3.04996C11.1445 3.44048 11.1445 4.07365 11.535 4.46417C11.9255 4.85469 12.5587 4.85469 12.9492 4.46417L13.6563 3.75706C14.0469 3.36654 14.0469 2.73337 13.6563 2.34285ZM12.242 13.6563L11.5349 12.9492C11.1443 12.5587 11.1443 11.9255 11.5349 11.535C11.9254 11.1445 12.5585 11.1445 12.9491 11.535L13.6562 12.2421C14.0467 12.6326 14.0467 13.2658 13.6562 13.6563C13.2656 14.0468 12.6325 14.0468 12.242 13.6563ZM16 7.99902C16 7.44674 15.5523 6.99902 15 6.99902H14C13.4477 6.99902 13 7.44674 13 7.99902C13 8.55131 13.4477 8.99902 14 8.99902H15C15.5523 8.99902 16 8.55131 16 7.99902ZM7 14C7 13.4477 7.44772 13 8 13C8.55228 13 9 13.4477 9 14V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V14ZM4.46492 11.5352C4.0744 11.1447 3.44123 11.1447 3.05071 11.5352L2.3436 12.2423C1.95307 12.6329 1.95307 13.266 2.3436 13.6566C2.73412 14.0471 3.36729 14.0471 3.75781 13.6566L4.46492 12.9494C4.85544 12.5589 4.85544 11.9258 4.46492 11.5352ZM4.46477 3.04973C4.85529 3.44025 4.85529 4.07342 4.46477 4.46394C4.07424 4.85447 3.44108 4.85447 3.05055 4.46394L2.34345 3.75684C1.95292 3.36631 1.95292 2.73315 2.34345 2.34262C2.73397 1.9521 3.36714 1.9521 3.75766 2.34262L4.46477 3.04973ZM3 8C3 7.44772 2.55228 7 2 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H2C2.55228 9 3 8.55228 3 8Z"
                        fill={mode === "light" ? "#38BDF8" : undefined}
                      />
                    </svg>
                  </div>
                  <div className="ml-3">Light</div>
                </div>
                <div
                  onClick={() => {
                    handleChangeMode("dark");
                  }}
                  className={`flex cursor-pointer ${
                    mode == "dark" && "bg-slate-50 text-slate-900"
                  } rounded-[10px] p-1`}
                >
                  <div className="flex size-6 flex-none items-center justify-center rounded-md bg-white ring-1 shadow-sm ring-slate-900/10">
                    <svg className="size-4 fill-slate-400">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill={mode === "dark" ? "#38BDF8" : undefined}
                        d="M7.23 3.333C7.757 2.905 7.68 2 7 2a6 6 0 1 0 0 12c.68 0 .758-.905.23-1.332A5.989 5.989 0 0 1 5 8c0-1.885.87-3.568 2.23-4.668ZM12 5a1 1 0 0 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 2 1 1 0 0 0-1 1 1 1 0 1 1-2 0 1 1 0 0 0-1-1 1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 1-1Z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">Dark</div>
                </div>
                <div
                  onClick={() => {
                    handleChangeMode("os");
                  }}
                  className={`flex cursor-pointer ${
                    mode == "os" && "bg-slate-50 text-main"
                  }  rounded-[10px] p-1`}
                >
                  <div className="flex size-6 flex-none items-center justify-center rounded-md bg-white ring-1 shadow-sm ring-slate-900/10">
                    <svg className="size-4 fill-slate-400">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill={mode === "os" ? "#38BDF8" : undefined}
                        d="M1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.5l.31 1.242c.084.333.36.573.63.808.091.08.182.158.264.24A1 1 0 0 1 11 15H5a1 1 0 0 1-.704-1.71c.082-.082.173-.16.264-.24.27-.235.546-.475.63-.808L5.5 11H4a3 3 0 0 1-3-3V4Zm3-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 ">System</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            setIsDarkMode(false);
          }}
          className="md:hidden p-2 ml-11  text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg md:hidden">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                      className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <span
                    onClick={handleLogout}
                    className="block py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="hidden md:flex md:items-center md:space-x-8">
          <ul className="flex space-x-3 xl:space-x-8 font-medium">
            <li>
              <NavLink
                to="/"
                className="font-bold text-gray-900 dark:text-gray-200 hover:text-main dark:hover:text-yellow-400 block py-2 px-3"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="font-bold text-gray-900 dark:text-gray-200 hover:text-main dark:hover:text-yellow-400 block py-2 px-3"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className="font-bold text-gray-900 dark:text-gray-200 hover:text-main dark:hover:text-yellow-400 block py-2 px-3"
              >
                Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="font-bold text-gray-900 dark:text-gray-200 hover:text-main dark:hover:text-yellow-400 block py-2 px-3"
              >
                Brands
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="font-bold text-gray-900 dark:text-gray-200 hover:text-main dark:hover:text-yellow-400 focus:outline-none duration-200"
          >
            <span className="md:block hidden">Account</span>{" "}
            <i className="fa-solid fa-user"></i> ▾
          </button>

          {dropdownOpen && (
            <ul className="absolute top-10 right-0 mt-2 w-48 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
              {userToken && (
                <>
                  <li>
                    <NavLink
                      to="/cart"
                      className="block py-6 px-4 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                      className="block py-6 px-4 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                      className="block py-6 px-4 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Orders{" "}
                      <i className="fa-solid fa-truck relative">
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
                      className="block py-6 px-4 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Update Account{" "}
                      <i className="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/change_my_password"
                      className="block py-6 px-4 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Change Password{" "}
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
                      className="block px-4 py-2 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="py-6 px-4">
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="hover:text-red-600">
                  <span
                    onClick={handleLogout}
                    className="block py-6 px-4 font-bold text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <span className="mr-3 inline-block duration-200">
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
