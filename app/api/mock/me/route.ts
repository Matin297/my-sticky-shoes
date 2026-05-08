import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN, MOCK_USER } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN)?.value;

  if (!token || token !== MOCK_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  return NextResponse.json({
    user: MOCK_USER,
  });
}
