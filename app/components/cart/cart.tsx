import { getCart, getCartId } from "@/lib/shopify/api";
import CartDetails from "./cart-details";
import type { Cart } from "@/utils/types";
import { cookies } from "next/headers";

export default async function Cart() {
  const cart = await getCart();

  return <CartDetails cart={cart} />;
}
