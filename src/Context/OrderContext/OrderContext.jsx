import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";
import { createContext, useContext, useEffect } from "react";

export const orderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { userData, userToken } = useContext(authContext);

  const handleGetUserOrders = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getUserOrders"],
    queryFn: handleGetUserOrders,
    enabled: !!userToken && !!userData.id,
  });

  const dataOrders = data?.data;
  const numberOfOrders = data?.data.length;

  return (
    <orderContext.Provider value={{ dataOrders, numberOfOrders, isLoading }}>
      {children}
    </orderContext.Provider>
  );
};
