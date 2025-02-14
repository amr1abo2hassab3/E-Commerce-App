import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { userToken } = useContext(authContext);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  const numOfCartItems = products?.length;

  const resetValues = () => {
    setTotalCartPrice(0);
    setProducts(null);
    setCartId(null);
  };

  const AddToCart = async (productId) => {
    const request = axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      {
        headers: {
          token: userToken,
        },
      }
    );

    try {
      const res = await toast.promise(
        request,
        {
          pending: "Adding product to cart...",
          success: "Product added successfully! 🎉",
          error: "Failed to add product! ❌",
        },
        { autoClose: 1500 }
      );
      setCartId(res?.data.cartId);
      getUserCart();
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const getUserCart = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        setCartId(res?.data.cartId);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const updateCountQuantity = async (id, newcount) => {
    const request = axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: newcount,
      },
      {
        headers: {
          token: userToken,
        },
      }
    );

    try {
      const res = await toast.promise(
        request,
        {
          pending: "Updating product in cart...",
          success: "Product updated successfully! 🎉",
          error: "Failed to update product! ❌",
        },
        { autoClose: 1500 }
      );
      setTotalCartPrice(res.data.data.totalCartPrice);
      setProducts(res.data.data.products);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const deleteItemInCart = async (id) => {
    const request = axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      {
        headers: {
          token: userToken,
        },
      }
    );

    try {
      const res = await toast.promise(
        request,
        {
          pending: "Deleting product in cart...",
          success: "Product Deleted successfully! 🎉",
          error: "Failed to Delete this product! ❌",
        },
        { autoClose: 1500 }
      );
      setTotalCartPrice(res.data.data.totalCartPrice);
      setProducts(res.data.data.products);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const DeleteAllItemsInCart = async () => {
    const request = axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers: {
          token: userToken,
        },
      }
    );

    try {
      toast
        .promise(
          request,
          {
            pending: "Deleting All product in cart...",
            success: "All Product Deleted successfully! 🎉",
            error: "Failed to Delete this All product! ❌",
          },
          { autoClose: 1500 }
        )
        .then(() => {
          setTotalCartPrice(0);
          setProducts([]);
        });
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    if (userToken) getUserCart();
  }, [userToken]);

  return (
    <cartContext.Provider
      value={{
        AddToCart,
        numOfCartItems,
        totalCartPrice,
        products,
        updateCountQuantity,
        deleteItemInCart,
        DeleteAllItemsInCart,
        resetValues,
        cartId,
      }}
    >
      {children}
      <ToastContainer />
    </cartContext.Provider>
  );
};
