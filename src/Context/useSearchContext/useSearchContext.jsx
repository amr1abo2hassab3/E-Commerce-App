import { createContext, useEffect, useState } from "react";
import { useGetAllProducts } from "../../customHooks/useGetAllProducts";

export const searchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [keyWord, setKeyWord] = useState("");
  const [products, setProducts] = useState([]);
  const { data, isLoading } = useGetAllProducts();

  useEffect(() => {
    if (data?.data?.data) {
      setProducts(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.data?.data) return;
    const filteredProducts = data.data.data.filter((product) =>
      product.title.trim().toLowerCase().includes(keyWord.toLowerCase().trim())
    );
    setProducts(filteredProducts);
  }, [keyWord, data]);

  return (
    <searchContext.Provider
      value={{ keyWord, setKeyWord, products, isLoading }}
    >
      {children}
    </searchContext.Provider>
  );
};
