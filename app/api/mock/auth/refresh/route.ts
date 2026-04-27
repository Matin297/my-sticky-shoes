import { type NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_MAX_AGE,
  BASE_COOKIE_OPTIONS,
  REFRESH_TOKEN,
} from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if (!refreshToken || refreshToken !== MOCK_REFRESH_TOKEN) {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(ACCESS_TOKEN, MOCK_ACCESS_TOKEN, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  return response;
}
