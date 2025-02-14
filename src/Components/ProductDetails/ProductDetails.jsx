import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/LoaderScreen";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { HeaderTitle } from "../HeaderTitle/HeaderTitle";
import { CardItem } from "../CardItem/CardItem";
export const ProductDetails = () => {
  const [indexImage, setIndexImage] = useState(0);
  const { id, idCategory } = useParams();
  const { AddToCart } = useContext(cartContext);

  const handleAddToCart = (id) => {
    AddToCart(id);
  };

  const getProductDetails = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  const getProductsInSameDetails = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${idCategory}`
    );
  };

  const { data: dataProducts, isLoading: isLoadingSame } = useQuery({
    queryKey: ["getProductsInSameDetails", idCategory],
    queryFn: getProductsInSameDetails,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getProductDetails", id],
    queryFn: getProductDetails,
    keepPreviousData: true,
  });

  const handleChangeImage = (index) => {
    setIndexImage(index);
  };

  const product = data?.data.data;
  const products = dataProducts?.data.data;
  let images = product?.images;

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="container mx-auto">
        <div className="grid md:max-h-[500px] custom-scrollbar md:overflow-auto w-auto xl:w-[70%] border-main border mx-auto mt-8 md:grid-cols-2 grid-cols-1 shadow-[0_0_10px_#00000042] justify-evenly items-center bg-[#00ffff00]   rounded-md">
          <div className=" flex h-full  flex-col justify-center items-center bg-[#f6f6f6]">
            <div className="w-full  border-main border">
              <img
                className="  object-cover"
                src={images[indexImage]}
                alt={product?.title}
              />
            </div>
            <div className="w-full flex-wrap  flex gap-3 p-4">
              {images.map((image, index) => (
                <div
                  onClick={() => {
                    handleChangeImage(index);
                  }}
                  key={index}
                  className={`flex-1 cursor-pointer min-w-[calc(25%-16px)]  border-4 rounded-lg overflow-hidden ${
                    index == indexImage && "border-main"
                  } p-2`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={product?.title}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 text-center h-full flex flex-col justify-between">
            <h1 className="lg:text-3xl font-semibold mb-4 capitalize">
              {product?.title}
            </h1>
            <p className="capitalize lg:text-xl font-medium text-1xl text-[#555] my-4">
              {product?.description}
            </p>
            <h5 className="capitalize font-semibold lg:text-2xl">
              {product?.category?.name}
            </h5>
            <div className="flex items-center justify-between my-5">
              <span className="font-semibold lg:text-2xl">
                ${product?.price}
              </span>
              <span
                className={`text-red-600 font-semibold  lg:text-2xl line-through`}
              >
                {product?.priceAfterDiscount &&
                  "$" + product?.priceAfterDiscount}
              </span>
              <span className="text-gray-700 font-bold lg:text-2xl">
                {product?.ratingsAverage}
                <i className="fa-solid fa-star text-rating"></i>
              </span>
            </div>
            <button
              onClick={() => {
                handleAddToCart(product._id);
              }}
              className="bg-main w-full text-white lg:py-3 py-1.5 px-4 text-1xl rounded-md transition-all duration-300 font-bold border border-transparent hover:!bg-white hover:!text-black hover:!border-main"
            >
              Add to cart <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <HeaderTitle name={product?.category?.name} />
        <div className="grid mt-11 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
          {products?.length > 0 &&
            products?.map((product) => (
              <CardItem key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};
