import { axiosInstance } from "@/lib/axios";
import { EMPLOYEE_ENDPOINT } from "@/lib/endpoints";
import { EmployeeItemResponse } from "@/types/employee-type";
import { PaginationParams, StateStatus } from "@/types/general";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetEmployees = (token: string, queryParams: PaginationParams) => {
  return useQuery({
    queryKey: ["getEmployees", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${EMPLOYEE_ENDPOINT}`, {
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
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useGetEmployee = (token: string, id: string) => {
  return useQuery({
    queryKey: ["getEmployee", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${EMPLOYEE_ENDPOINT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token && !!id,
  });
};

export const useUpdateEmployee = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, id, body }: { token: string; id: string; body: EmployeeItemResponse }) => {
      try {
        const response = await axiosInstance.patch(`${EMPLOYEE_ENDPOINT}/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal memperbarui data pegawai");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useCreateEmployee = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: EmployeeItemResponse }) => {
      const response = await axiosInstance.post(`${EMPLOYEE_ENDPOINT}`, body, {
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

export const useDeleteEmployee = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, id }: { token: string; id: string }) => {
      const response = await axiosInstance.delete(`${EMPLOYEE_ENDPOINT}/${id}`, {
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
