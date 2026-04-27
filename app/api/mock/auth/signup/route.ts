import { type NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN, MOCK_USER } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields: email, password" },
        { status: 400 },
      );
    }

    setAuthCookies({ accessToken: MOCK_ACCESS_TOKEN, refreshToken: MOCK_REFRESH_TOKEN });

    return NextResponse.json({
      user: MOCK_USER,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
