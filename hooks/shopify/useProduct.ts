import { useQuery } from "@tanstack/react-query";
import { Product } from "../../utils/types";
import { shopifyFetch, unwrapEdges } from "@/utils/shopify/shopify";

export async function fetchProduct(handle: string) {
  const query = `
    query getProduct {
      product(handle: "${handle}") {
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
      }
    }
  `;

  const data: any = await shopifyFetch(query);

  return unwrapEdges(data.data.product) as Product;
}

export function useProduct(productHandle: string) {
  return useQuery({
    queryKey: ["product", productHandle],
    queryFn: () => fetchProduct(productHandle),
    enabled: !!productHandle,
  });
}
