import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const SHOPIFY_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, variables } = req.body;

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

    res.status(200).json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
}
