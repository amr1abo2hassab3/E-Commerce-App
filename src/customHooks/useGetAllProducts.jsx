import { useQuery } from "@tanstack/react-query";
import { handleGetAllProdcuts } from "../utils";

export const useGetAllProducts = () => {


  const query = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: handleGetAllProdcuts,
    refetchOnWindowFocus: true,
  });
  return query;
};
