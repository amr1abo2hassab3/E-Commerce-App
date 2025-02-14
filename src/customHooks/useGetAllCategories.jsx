import { useQuery } from "@tanstack/react-query";
import { handleGetAllCategories } from "../utils";

export const useGetAllCategories = () => {
  const query = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: handleGetAllCategories,
    refetchOnWindowFocus: true,
  });
  return query;
};
