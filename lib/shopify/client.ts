import { cookies } from "next/headers";
import { createCart } from "./api";

const SHOPIFY_URL = `https://${process.env.NEXT_PUBLIC_STORE_NAME}.myshopify.com/api/2025-10/graphql.json`;

export async function shopifyFetch(
  query: string,
  variables?: any,
  tags?: string[]
) {
  try {
    const res = await fetch(SHOPIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
      next: { tags: tags || [] },
    });

    if (!res.ok) {
      throw new Error(`Shopify fetch failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}

type AnyObject = Record<string, any>;

export function unwrapEdges(data: AnyObject): AnyObject {
  if (Array.isArray(data)) {
    return data.map(unwrapEdges);
  }

  if (data && typeof data === "object") {
    if ("edges" in data && Array.isArray(data.edges)) {
      return unwrapEdges(data.edges.map((edge: any) => edge.node));
    }

    const cleaned: AnyObject = {};
    for (const key in data) {
      cleaned[key] = unwrapEdges(data[key]);
    }
    return cleaned;
  }

  return data;
}
