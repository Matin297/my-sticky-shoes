import { type NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/services/mock/products";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const cursor = parseInt(searchParams.get("cursor") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const start = cursor * limit;
    const end = start + limit;
    const products = MOCK_PRODUCTS.slice(start, end);
    const hasMore = end < MOCK_PRODUCTS.length;

    return NextResponse.json({
      products,
      nextCursor: hasMore ? cursor + 1 : null,
      hasMore,
      total: MOCK_PRODUCTS.length,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
