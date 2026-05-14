import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  if (!accessToken || accessToken !== MOCK_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  try {
    console.log("🔕 Mock: FCM token unregistered");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
