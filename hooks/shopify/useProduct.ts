import { useQuery } from "@tanstack/react-query";
import { Product } from "../../utils/types";
import { shopifyFetch, unwrapEdges } from "@/utils/shopify/shopify";

export async function fetchProduct(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        title
        handle
        description
        descriptionHtml
        featuredImage {
          id
          altText
          height
          width
          url
        }
        images(first: 10) {
          edges {
            node {
              id
              altText
              height
              width
              url
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          id
          name
          optionValues {
            id
            name
            firstSelectableVariant {
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    handle: handle,
  };

  const data: any = await shopifyFetch(query, variables);

  return unwrapEdges(data.data.product) as Product;
}

export function useProduct(productHandle: string) {
  return useQuery({
    queryKey: ["product", productHandle],
    queryFn: () => fetchProduct(productHandle),
    enabled: !!productHandle,
  });
}
