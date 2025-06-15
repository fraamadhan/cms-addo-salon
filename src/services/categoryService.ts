import { axiosInstance } from "@/lib/axios";
import { CATEGORY_ENDPOINT } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${CATEGORY_ENDPOINT}`);

      return response.data;
    },
  });
};
