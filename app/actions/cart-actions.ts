"use server";

import { getCartId } from "@/lib/shopify/api";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  ADD_CART_LINES,
  REMOVE_CART_LINES,
  UPDATE_CART_LINES,
} from "@/lib/shopify/queries";
import { CartUpdateLine } from "@/utils/types";
import { updateTag } from "next/cache";

export async function deleteItem(previousState: any, formData: FormData) {
  const cartId = await getCartId();

  const lineId = formData.get("lineId");
  if (!lineId) {
    return { errors: { delete: "LineId is undefined" } };
  }

  try {
    const variables = {
      cartId,
      lineIds: [lineId],
    };

    const resp = await shopifyFetch(REMOVE_CART_LINES, variables);

    if (resp?.errors) {
      return { errors: { delete: resp?.errors[0].message } };
    }

    updateTag("cart");
  } catch (error) {
    updateTag("cart");
    return {
      errors: {
        delete: error,
      },
    };
  }
}

export async function addCartLine(previousState: any, formData: FormData) {
  const cartId = await getCartId();

  const variantId = formData.get("variantId");
  const quantity = Number(formData.get("quantity"));

  const variables = {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  };

  await shopifyFetch(ADD_CART_LINES, variables);
  updateTag(`cart-${cartId}`);

  return {
    inputs: {
      Color: formData.get("Color"),
      Size: formData.get("Size"),
      quantity: quantity,
    },
  };
}

export async function updateCartLineQuantity(
  previousState: any,
  formData: FormData
) {
  const cartId = await getCartId();

  const line: CartUpdateLine = {
    id: formData.get("lineId") as string,
    quantity: Number(formData.get("quantity")),
  };

  const variables = {
    cartId,
    cartLines: [line],
  };

  const res = await shopifyFetch(UPDATE_CART_LINES, variables);
  console.log(res);
  updateTag(`cart-${cartId}`);
}
