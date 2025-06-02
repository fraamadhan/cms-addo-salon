import { axiosInstance } from "@/lib/axios";
import { DASHBOARD_ENDPOINT } from "@/lib/endpoints";
import { DashboardFilter } from "@/types/general";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardData = (token: string, queryParams: DashboardFilter) => {
  return useQuery({
    queryKey: ["getDashboardData", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${DASHBOARD_ENDPOINT}`, {
        params: {
          ...queryParams,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
  });
};
