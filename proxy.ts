import { NextRequest, NextResponse } from "next/server";
import { createCart } from "./lib/shopify/api";

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const cartId = request.cookies.get("cartId");

  if (!cartId) {
    const id = await createCart();
    response.cookies.set("cartId", id);
  }

  return response;
}
