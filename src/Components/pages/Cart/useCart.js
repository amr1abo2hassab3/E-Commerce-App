import { useContext } from "react";
import { cartContext } from "../../../Context/CartContext";

export const useCart = () => {
  const {
    products,
    totalCartPrice,
    numOfCartItems,
    updateCountQuantity,
    deleteItemInCart,
    DeleteAllItemsInCart,
    setByCash,
    byCash,
  } = useContext(cartContext);

  const handleChangeCount = (id, newCount) => {
    updateCountQuantity(id, newCount);
  };

  const handleDeleteItem = (id) => {
    deleteItemInCart(id);
  };

  const handleDeleteAllProducts = () => {
    DeleteAllItemsInCart();
  };

  return {
    handleChangeCount,
    handleDeleteItem,
    handleDeleteAllProducts,
    products,
    totalCartPrice,
    numOfCartItems,
    setByCash,
    byCash,
  };
};
