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

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN)?.value;

  if (!token || token !== MOCK_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, avatar } = body;
    const errors: Partial<Record<"name" | "email", string>> = {};

    if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({
      user: {
        ...MOCK_USER,
        name: name ?? MOCK_USER.name,
        email: email ?? MOCK_USER.email,
        avatar,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
