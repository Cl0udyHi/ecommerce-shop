import { NextRequest } from "next/server";
import axios from "axios";

const SHOPIFY_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

export async function POST(request: NextRequest) {
  try {
    const { query, variables } = await request.json();

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

    return Response.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    return Response.json(
      { error: err.message },
      { status: err.response?.status || 500 }
    );
  }
}
