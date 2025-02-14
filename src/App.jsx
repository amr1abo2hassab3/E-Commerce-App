import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Home } from "./Components/pages/Home/Home";
import { Login } from "./Components/pages/Login/Login";
import { Register } from "./Components/pages/Register/Register";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import { ProductsPage } from "./Components/pages/Products/ProductsPage";
import { ProductDetails } from "./Components/ProductDetails/ProductDetails";
import { Cart } from "./Components/pages/Cart/Cart";
import { ProtectedAuth } from "./Components/pages/ProtectedAuth/ProtectedAuth";
import { Category } from "./Components/pages/Category/Category";
import { Brand } from "./Components/pages/Brand/Brand";
import { BrandDetails } from "./Components/pages/BrandDetails/BrandDetails";
import { WishList } from "./Components/pages/WishList/WishList";
import { SendEmail } from "./Components/pages/SendEmail/SendEmail";
import { CheckCode } from "./Components/CheckCode/CheckCode";
import { ResetPassword } from "./Components/pages/ResetPassword/ResetPassword";
import { NotFound } from "./Components/pages/NotFound/NotFound";
import { CachOrder } from "./Components/pages/CachOrder/CachOrder";
import { ChangeMyPassword } from "./Components/pages/ChangeMyPassword/ChangeMyPassword";
import { UpdateAccount } from "./Components/pages/UpdateAccount/UpdateAccount";
import { UserOrders } from "./Components/pages/UserOrders/UserOrders";

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productDetails/:id/:idCategory",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brandDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cachorder",
        element: (
          <ProtectedRoute>
            <CachOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "/change_my_password",
        element: (
          <ProtectedRoute>
            <ChangeMyPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update_account",
        element: (
          <ProtectedRoute>
            <UpdateAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sendemail",
        element: (
          <ProtectedAuth>
            <SendEmail />
          </ProtectedAuth>
        ),
      },
      {
        path: "/checkcode",
        element: (
          <ProtectedAuth>
            <CheckCode />
          </ProtectedAuth>
        ),
      },
      {
        path: "/resetpassword",
        element: (
          <ProtectedAuth>
            <ResetPassword />
          </ProtectedAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}
