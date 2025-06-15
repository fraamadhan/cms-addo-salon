import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("access_token");

  return accessToken;
};

export const deleteAccessToken = () => {
  Cookies.remove("access_token");
};

export const jwtTokenDecode = (token: string) => {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    throw error;
  }
};

export const getUserIdFromToken = () => {
  const token = getAccessToken();

  if (token) {
    const temp = jwtDecode<JwtPayload & { _id?: string }>(token);

    return temp?._id || null;
  }
};
export const getUserRoleFromToken = () => {
  const token = getAccessToken();

  if (token) {
    const temp = jwtDecode<JwtPayload & { role?: string }>(token);

    return temp?.role || null;
  }
};
