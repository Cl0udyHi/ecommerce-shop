import { getCart } from "@/lib/shopify/api";
import CartDetails from "./cart-details";
import type { Cart } from "@/utils/types";

export default async function Cart() {
  const cart = await getCart();

  return <CartDetails cart={cart} />;
}
