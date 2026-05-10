import { type NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN, MOCK_USER } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, confirmPassword } = body;

    if (!email || !password || !name || !confirmPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (email === MOCK_USER.email) {
      return NextResponse.json({ error: "User account already exists" }, { status: 409 });
    }

    await setAuthCookies({ accessToken: MOCK_ACCESS_TOKEN, refreshToken: MOCK_REFRESH_TOKEN });

    return NextResponse.json({
      user: MOCK_USER,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
