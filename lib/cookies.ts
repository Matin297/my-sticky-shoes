import { cookies } from "next/headers";
import { isProductionEnv } from "./utils";

export const ACCESS_TOKEN = "mss-access-token";
export const REFRESH_TOKEN = "mss-refresh-token";

export const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProductionEnv,
  sameSite: isProductionEnv ? "strict" : "lax",
  path: "/",
} as const;

interface SetAuthCookiesProps {
  accessToken: string;
  refreshToken: string;
}

export async function setAuthCookies({ accessToken, refreshToken }: SetAuthCookiesProps) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN, accessToken, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  cookieStore.set(REFRESH_TOKEN, refreshToken, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete(REFRESH_TOKEN);
}
