import { axiosInstance } from "@/lib/axios";
import { SERVICE_ENDPOINT } from "@/lib/endpoints";
import { ParamsFilterService, StateStatus } from "@/types/general";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetServices = (queryParams: ParamsFilterService) => {
  return useQuery({
    queryKey: ["getServices", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${SERVICE_ENDPOINT}`, {
        params: {
          ...queryParams,
        },
      });

      return response.data;
    },
  });
};

export const useGetService = (id: string) => {
  return useQuery({
    queryKey: ["getService", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${SERVICE_ENDPOINT}/${id}`);

      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateService = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: FormData | null }) => {
      try {
        const response = await axiosInstance.post(`${SERVICE_ENDPOINT}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Gagal menambah data layanan");
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useUpdateService = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, id, body }: { token: string; id: string; body: FormData | null }) => {
      try {
        const response = await axiosInstance.patch(`${SERVICE_ENDPOINT}/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal memperbarui data layanan");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useDeleteService = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, id }: { token: string; id: string }) => {
      try {
        const response = await axiosInstance.delete(`${SERVICE_ENDPOINT}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal menghapus data layanan");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};
