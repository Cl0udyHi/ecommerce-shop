import { NextRequest, NextResponse } from "next/server";
import { createCart } from "./lib/shopify/api";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const cartId = request.cookies.get("cartId");

  if (!cartId) {
    const id = await createCart();
    response.cookies.set("cartId", id);
  }

  return response;
}
