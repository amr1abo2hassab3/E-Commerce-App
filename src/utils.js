import axios from "axios";

export const handleGetAllCategories = () => {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
};

export const handleGetAllProdcuts = () => {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
};
