import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "@/lib/cookies";
import { MOCK_ACCESS_TOKEN } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  if (!accessToken || accessToken !== MOCK_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    return NextResponse.json({
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJ-qVAm4fZFHwYnkbHAQNergnNEibLZXw5w&s",
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
