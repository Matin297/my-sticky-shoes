import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN } from "@/lib/mock-data";

interface PushSubscriptionRequestBody {
  token: string;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(ACCESS_TOKEN)?.value;

    if (!token || token !== MOCK_ACCESS_TOKEN) {
      return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const { token: pushToken }: PushSubscriptionRequestBody = await request.json();

    if (!pushToken) {
      return NextResponse.json({ error: "Invalid subscription object" }, { status: 400 });
    }

    // MOCK: save the subscription to backend

    console.log(`Push subscription added.`);

    return NextResponse.json({ success: true });
  } catch (_) {
    return NextResponse.json({ error: "Unable to save push subscription." }, { status: 500 });
  }
}
