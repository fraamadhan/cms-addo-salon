import { axiosInstance } from "@/lib/axios";
import { LOGIN_ENDPOINT } from "@/lib/endpoints";
import { LoginInputType } from "@/types/auth-type";
import { StateStatus } from "@/types/general";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = ({ onSuccess, onError }: StateStatus) => {
  return useMutation({
    mutationFn: async (body: LoginInputType) => {
      const response = await axiosInstance.post(LOGIN_ENDPOINT ?? "", body);
      const access_token = response?.data?.data?.access_token;
      const expirationTime = Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_IN) ?? 0.5;

      if (access_token) {
        Cookies.set("access_token", access_token, {
          expires: expirationTime,
          secure: !!process.env.NEXT_PUBLIC_TOKEN_SECURE,
        });
      }
      console.log(response.data.data);

      return response.data;
    },
    onSuccess,
    onError,
  });
};
