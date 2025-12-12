import { NextRequest, NextResponse } from "next/server";
import { createCart } from "./lib/shopify/api";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const cartId = request.cookies.get("cartId");

  if (!cartId) {
    try {
      const id = await createCart();
      response.cookies.set("cartId", id, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
      });
    } catch (err) {
      console.error("Failed to create Shopify cart:", err);
      return response;
    }
  }

  return response;
}
