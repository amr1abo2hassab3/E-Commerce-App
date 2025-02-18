import { lazy, Suspense, useEffect, useState } from "react";
import { HeaderTitle } from "../../HeaderTitle/HeaderTitle";
import img from "../../../assets/images/all.png";
import { useGetAllCategories } from "./../../../customHooks/useGetAllCategories";
import { useGetAllProducts } from "./../../../customHooks/useGetAllProducts";
import { Loader } from "./../../Loader/LoaderScreen";
import axios from "axios";
import { CardItem } from "../../CardItem/CardItem";

const CategoryCard = lazy(() =>
  import("../../CategoryCard/CategoryCard").then((module) => ({
    default: module.CategoryCard,
  }))
);

export const Category = () => {
  const [dataSameCategory, setDataSameCategory] = useState(null);
  const [dataSame, setDataSame] = useState(null);
  const [imageSame, setImageSame] = useState(null);
  const [nameSame, setNameSame] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const {
    data: dataCategory,
    isError,
    isLoading,
    error,
  } = useGetAllCategories();
  const { data: dataProducts, isLoading: ProductsIsLoading } =
    useGetAllProducts();

  const handleAllProducts = () => {
    if (dataProducts?.data?.data) {
      setDataSameCategory(dataProducts?.data);
      setDataSame(dataProducts?.data.data);
      setImageSame(img);
      setNameSame("All");
    }
  };

  const handleGetSameCategory = (categoryId) => {
    setIsLoading(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      )
      .then((res) => {
        setDataSameCategory(res.data);
        setDataSame(res.data.data);
        if (res.data.data.length > 0) {
          setImageSame(res.data.data[0].category.image);
          setNameSame(res.data.data[0].category.name);
        }
      })
      .catch((res) => console.log(res))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const AllProducts = dataProducts?.data.data;
  const categories = dataCategory?.data.data;

  useEffect(() => {
    handleAllProducts();
  }, [dataProducts]);

  return (
    <div className="container mx-auto mt-16">
      <HeaderTitle name="Categories" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {(ProductsIsLoading || isLoading || loading) && <Loader />}
        {isError && (
          <p className="text-center text-xl font-bold">{error.message} ❌😫</p>
        )}
        <Suspense fallback={<Loader />}>
          <CategoryCard
            name={"All"}
            image={img}
            AllProducts={AllProducts}
            key={"all"}
            handleGetSameCategory={handleAllProducts}
          />
        </Suspense>
        {categories?.map((cat) => (
          <Suspense key={cat._id} fallback={<Loader />}>
            <CategoryCard
              id={cat._id}
              image={cat.image}
              name={cat.name}
              handleGetSameCategory={handleGetSameCategory}
            />
          </Suspense>
        ))}
      </div>
      {!dataSameCategory?.results ? (
        <h3 className="font-semibold text-2xl text-red-600 capitalize mt-12 text-center">
          there are no currently no products form this category
        </h3>
      ) : (
        <div className="w-1/3 mt-16 mx-auto">
          <div
            className={`bg-[#FEFEFE] flex rounded cursor-pointer transition-all duration-500 rotate-3 shadow-[0px_10px_30px_rgba(0,0,0,0.2)]  border-main border
    dark:bg-gray-800 dark:shadow-[0px_10px_30px_rgba(255,255,255,0.1)] dark:border-gray-500`}
          >
            <div className="bg-main w-[25%] h-[100px] flex justify-center items-center rounded">
              <img
                className="max-w-[97px] max-h-[97px] p-2"
                src={imageSame}
                alt={nameSame}
              />
            </div>
            <div className="w-[75%] ml-9 leading-[1.6] flex flex-col justify-center gap-2">
              <h4 className="text-xl capitalize font-semibold dark:text-white">
                {nameSame}
              </h4>
              {AllProducts && (
                <p className="text-sm font-normal text-[#555] dark:text-gray-300">
                  <span className="font-semibold dark:text-white">
                    {dataSame?.length}
                  </span>{" "}
                  items
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 mt-12">
        {dataSame?.map((product) => (
          <CardItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
