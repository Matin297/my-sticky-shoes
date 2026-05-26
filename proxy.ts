import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { REFRESH_TOKEN } from "@/lib/cookies";

const PUBLIC_ROUTES = ["/login", "/signup", "/sw.js", "/manifest.webmanifest", "/landing", "/faq"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPrivateRoute = !isPublicRoute;
  const refreshToken = (await cookies()).get(REFRESH_TOKEN)?.value;

  if (isPublicRoute) {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
  }

  if (isPrivateRoute && !refreshToken) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|public|.*\\.(?:ico|png|jpg|jpeg|gif|webp|avif|svg|css|js|map|txt|xml)$).*)",
  ],
};
