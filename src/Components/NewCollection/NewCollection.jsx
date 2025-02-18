import { useQuery } from "@tanstack/react-query";
import { HeaderTitle } from "../HeaderTitle/HeaderTitle";
import axios from "axios";
import { Loader } from "../Loader/LoaderScreen";
import { lazy, Suspense } from "react";

const CardItem = lazy(() =>
  import("../CardItem/CardItem").then((module) => ({
    default: module.CardItem,
  }))
);

export const NewCollection = ({ id, category, queryKey }) => {
  const getCategorySpecific = () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: getCategorySpecific,
  });

  const dataProducts = data?.data.data;

  return (
    <div className="my-16">
      {isLoading && <Loader />}
      <HeaderTitle name={category} />
      <h3 className="mt-5 font-extrabold text-[36px]">
        New <span className="text-main">{category}</span> Collection{" "}
        <span className="text-main pl-5">{dataProducts?.length}</span> Items
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 mt-20">
        {dataProducts?.map((product) => (
          <Suspense key={product._id} fallback={<Loader />}>
            <CardItem product={product} color="#0aad0a" />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
