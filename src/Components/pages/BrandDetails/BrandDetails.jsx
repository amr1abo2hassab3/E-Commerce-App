import { useParams } from "react-router-dom";
import { BtnShop } from "../../BtnShop/BtnShop";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const BrandDetails = () => {
  const { id } = useParams();

  const handleGetBrandDetails = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getBrandDetails", id],
    queryFn: handleGetBrandDetails,
  });

  const dataDetails = data?.data.data;

  return (
    <div className="container mx-auto mt-16">
      <div className="grid lg:gap-0 gap-3 lg:grid-cols-2 grid-cols-1 items-center justify-center py-[35px] px-[20px] rounded-md bg-[#EDF2FB]">
        <div className="text-center">
          <h2 className="text-[60px] uppercase font-semibold">
            {dataDetails?.name}
          </h2>
          <BtnShop name={"shop now"} to={"/"} />
        </div>
        <div className="flex items-center justify-center group ">
          <div className="bg-[#c7d5f1] hover:shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-96 h-96 rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer">
            <img
              className="w-56 group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300"
              src={dataDetails?.image}
              alt={dataDetails?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
