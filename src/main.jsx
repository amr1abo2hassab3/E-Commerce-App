import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite";
import { AuthContextProvider } from "./Context/AuthContext/AuthContext.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { WishListContextProvider } from "./Context/WishListContext/WishListContext.jsx";
import { SearchContextProvider } from "./Context/useSearchContext/useSearchContext.jsx";
import { OrderContextProvider } from "./Context/OrderContext/OrderContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SearchContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <OrderContextProvider>
                <App />
              </OrderContextProvider>
            </CartContextProvider>
          </WishListContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </SearchContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
