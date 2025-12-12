"use server";

import { Cart, CartLine, Collection, Product } from "@/utils/types";
import { shopifyFetch, unwrapEdges } from "./client";
import {
  CREATE_CART,
  GET_CART,
  GET_COLLECTIONS,
  GET_PRODUCT,
  UPDATE_CART_LINES,
} from "./queries";
import { cookies } from "next/headers";

export async function getCollections() {
  const data: any = await shopifyFetch(GET_COLLECTIONS);

  return unwrapEdges(data.data.collections) as Collection[];
}

export async function getProduct(handle: string) {
  const data: any = await shopifyFetch(GET_PRODUCT, {
    handle: handle,
  });

  return unwrapEdges(data.data.product) as Product;
}

export async function getCartId() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("cartId")?.value;
  } catch (error) {
    throw error;
  }
}

export async function getCart(cartId?: string) {
  try {
    if (!cartId) {
      cartId = await getCartId();
    }

    const data = await shopifyFetch(GET_CART, { cartId: cartId }, [
      `cart-${cartId}`,
    ]);

    return unwrapEdges(data?.data?.cart) as Cart;
  } catch (error) {
    throw error;
  }
}

export async function createCart() {
  const data = await shopifyFetch(CREATE_CART);

  return data.data.cartCreate.cart.id;
}
