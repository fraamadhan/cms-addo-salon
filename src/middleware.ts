import { NextRequest, NextResponse } from "next/server";
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from "../route";
import { jwtDecode } from "jwt-decode";

export const middleware = async (req: NextRequest) => {
  const access_token = req.cookies.get("access_token")?.value;

  const { pathname } = req.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && access_token) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  if (!isAuthRoute && !access_token) {
    return NextResponse.redirect(new URL(authRoutes[0], req.url));
  }

  if (access_token) {
    try {
      const decoded: { exp: number } = jwtDecode(access_token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < now) {
        const isOnLoginPage = pathname === "/";
        if (!isOnLoginPage) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    } catch (error) {
      console.error("Invalid access token", error);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:jpg|svg|jpeg|png|webp)$).*)"],
};
