import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/LoaderScreen";
import { lazy, Suspense, useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { HeaderTitle } from "../HeaderTitle/HeaderTitle";

const CardItem = lazy(() =>
  import("../CardItem/CardItem").then((module) => ({
    default: module.CardItem,
  }))
);

const ProductDetailsContent = lazy(() =>
  import("./../ProductDetailsContent/ProductDetailsContent").then((module) => ({
    default: module.ProductDetailsContent,
  }))
);

export const ProductDetails = () => {
  const { id, idCategory } = useParams();
  const { AddToCart } = useContext(cartContext);

  const handleAddToCart = (id) => {
    AddToCart(id);
  };

  const getProductDetails = async () => {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return response.data.data;
  };

  const getProductsInSameCategory = async () => {
    if (!idCategory) return [];
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${idCategory}`
    );
    return response.data.data;
  };

  const { data: product, isLoading } = useQuery({
    queryKey: ["getProductDetails", id],
    queryFn: getProductDetails,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const { data: products = [], isLoading: isLoadingSame } = useQuery({
    queryKey: ["getProductsInSameCategory", idCategory],
    queryFn: getProductsInSameCategory,
    enabled: !!idCategory,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <ProductDetailsContent
          product={product}
          handleAddToCart={handleAddToCart}
        />
      </Suspense>

      {products.length > 0 && (
        <div className="mt-16">
          <HeaderTitle name={product?.category?.name} />
          <div className="grid mt-11 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
            {products.map((prod) => (
              <Suspense key={prod._id} fallback={<Loader />}>
                <CardItem product={prod} />
              </Suspense>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
