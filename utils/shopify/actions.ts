"use server";

import { cookies } from "next/headers";
import { fetchCartId } from "@/hooks/shopify/useCart";
import { shopifyFetch } from "./shopify";

export async function getCartId() {
  const Cookies = await cookies();
  let cartId = Cookies.get("cartId")?.value;

  if (!cartId) {
    return createCart();
  }

  return cartId;
}

export async function createCart() {
  const Cookies = await cookies();
  const id = await fetchCartId();

  Cookies.set("cartId", id);

  return id;
}

export async function addToCart(previousState: any, formData: FormData) {
  "use server";

  try {
    const quantity = Number(formData.get("quantity")) as number;
    const variantId = formData.get("variantId") as string;

    const cartId = await getCartId();

    const query = `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    };

    const data = await shopifyFetch(query, variables);
    console.log("cart id: " + cartId);
    console.log(data);
  } catch (error) {
    return { ...previousState, error: error };
  }
}
