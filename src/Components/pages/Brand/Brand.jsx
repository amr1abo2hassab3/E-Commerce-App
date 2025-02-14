import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "../../Loader/LoaderScreen";
import { CardBrand } from "../../CardBrand/CardBrand";

export const Brand = () => {
  const handleGetAllBrands = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getAllBrands"],
    queryFn: handleGetAllBrands,
  });

  const allBrands = data?.data.data;


  return (
    <>
      {isLoading && <Loader />}
      <h2 className="text-center capitalize font-extrabold text-[40px]  mt-20">
        our brands <span className="text-main"> {allBrands?.length} </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {allBrands?.map((brand) => (
          <CardBrand key={brand._id} brand={brand} />
        ))}
      </div>
    </>
  );
};
