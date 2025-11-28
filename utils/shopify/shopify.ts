import axios from "axios";
import { AnyObject, Product } from "../types";

const SHOPIFY_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
) {
  const response = await axios.post(
    SHOPIFY_URL,
    { query, variables },
    {
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.json() as Promise<T>;
}

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
