import { axiosInstance } from "@/lib/axios";
import { USER_ENDPOINT } from "@/lib/endpoints";
import { PaginationParams, StateStatus } from "@/types/general";
import { UpdatePasswordUser } from "@/types/user-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUsers = (token: string, queryParams: PaginationParams) => {
  return useQuery({
    queryKey: ["getUsers", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${USER_ENDPOINT}`, {
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

export const useGetUser = (token: string, id: string) => {
  return useQuery({
    queryKey: ["getUser", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${USER_ENDPOINT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token && !!id,
  });
};

export const useCreateUser = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: FormData }) => {
      try {
        const response = await axiosInstance.post(`${USER_ENDPOINT}/cms`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal menambahkan data pengguna");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useUpdateUser = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, id, body }: { token: string; id: string; body: FormData | UpdatePasswordUser }) => {
      try {
        const response = await axiosInstance.patch(`${USER_ENDPOINT}/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal memperbarui data pengguna");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useDeleteUser = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, id }: { token: string; id: string }) => {
      const response = await axiosInstance.delete(`${USER_ENDPOINT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess,
    onError,
  });
};
