import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  if (!accessToken || accessToken !== MOCK_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "FCM Token is missing" }, { status: 400 });
    }

    console.log(`Token registered: ${token}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
