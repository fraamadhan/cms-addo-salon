import { axiosInstance } from "@/lib/axios";
import { TRANSACTION_ENDPOINT } from "@/lib/endpoints";
import { TransactionStatus } from "@/lib/enum";
import { TransactionSchema } from "@/schemas/TransactionSchema";
import { StateStatus, TransactionQueryParams } from "@/types/general";
import { UpdateScheduleBody } from "@/types/transaction-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";

export const useGetOrders = (token: string, queryParams: TransactionQueryParams) => {
  return useQuery({
    queryKey: ["getOrders", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/orders`, {
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

export const useGetOrder = (token: string, id: string) => {
  return useQuery({
    queryKey: ["getOrder", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token && !!id,
  });
};

export const useGetTransactions = (token: string, queryParams: TransactionQueryParams) => {
  return useQuery({
    queryKey: ["getTransactions", queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/history`, {
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

export const useGetTransaction = (token: string, id: string) => {
  return useQuery({
    queryKey: ["getTransaction", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${TRANSACTION_ENDPOINT}/history/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token && !!id,
  });
};

export const useUpdateStatus = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, status, id }: { token: string; status: TransactionStatus; id: string }) => {
      try {
        console.log(status);
        const response = await axiosInstance.patch(
          `${TRANSACTION_ENDPOINT}/status/${id}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal memperbarui status");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useUpdateReservationDate = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body, id }: { token: string; body: UpdateScheduleBody; id: string }) => {
      try {
        const response = await axiosInstance.patch(`${TRANSACTION_ENDPOINT}/schedule/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal memperbarui jadwal pesanan");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useUpdateGeneralInfoOrder = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body, id }: { token: string; body: Record<string, string>; id: string }) => {
      try {
        const response = await axiosInstance.put(`${TRANSACTION_ENDPOINT}/order/${id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal memperbarui data pesanan");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useCreateTransaction = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, body }: { token: string; body: z.infer<typeof TransactionSchema> }) => {
      try {
        const response = await axiosInstance.post(`${TRANSACTION_ENDPOINT}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal menambah data transaksi");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};

export const useDeleteTransaction = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async ({ token, queryParams, id }: { token: string; queryParams: Record<string, string>; id: string }) => {
      try {
        const response = await axiosInstance.delete(`${TRANSACTION_ENDPOINT}/${id}`, {
          params: {
            ...queryParams,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Gagal menghapus data transaksi");
          }
        }
      }
    },
    onSuccess,
    onError,
  });
};
