import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../AuthContext/AuthContext";

export const whishListContext = createContext();
export const WishListContextProvider = ({ children }) => {
  const [idProducts, setIdProducts] = useState([]);
  const [dataWishList, setDataWishList] = useState([]);
  const [dataOfproducts, setDataOfproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userToken: token } = useContext(authContext);

  const numberOfWishList = dataOfproducts.length;

  useEffect(() => {
    if (localStorage.getItem("productsID") !== null) {
      setIdProducts(JSON.parse(localStorage.getItem("productsID")));
    }
  }, []);

  const addToWishList = async (productId) => {
    const request = axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      {
        headers: {
          token: token,
        },
      }
    );

    try {
      const res = await toast.promise(
        request,
        {
          pending: "Adding product to wishList...",
          success: "Product added successfully! ♥",
          error: "Failed to add product! ❌",
        },
        { autoClose: 1500 }
      );

      const newId = structuredClone(idProducts);
      if (!newId.includes(productId)) {
        newId.push(productId);
        setIdProducts(newId);
        localStorage.setItem("productsID", JSON.stringify(newId));
      }
      setDataWishList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserWishList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: token,
          },
        }
      );
      setDataOfproducts(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItemFromWishList = async (productId) => {
    const request = axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

      {
        headers: {
          token: token,
        },
      }
    );

    try {
      const res = await toast.promise(
        request,
        {
          pending: "Deleting product from wishList...",
          success: "Product Deleted successfully! ",
          error: "Failed to Delete product! ❌",
        },
        { autoClose: 1500 }
      );

      localStorage.setItem("productsID", JSON.stringify(res.data.data));
      setIdProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) getUserWishList();
  }, [dataWishList, idProducts]);
  return (
    <whishListContext.Provider
      value={{
        addToWishList,
        idProducts,
        dataWishList,
        dataOfproducts,
        isLoading,
        numberOfWishList,
        deleteItemFromWishList,
      }}
    >
      {children}
    </whishListContext.Provider>
  );
};
