import { type NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/services/mock/products";

export async function GET(_: NextRequest, ctx: RouteContext<"/api/mock/products/[id]">) {
  try {
    const { id } = await ctx.params;
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
