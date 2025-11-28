import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../../utils/types";
import { shopifyFetch, unwrapEdges } from "@/utils/shopify/shopify";

async function fetchProduct(handle: string) {
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

  const { data } = await axios.post("/api/shopify", { query });
  const productData = data.data.product;

  return unwrapEdges(productData) as Product;
}

export function useProduct(productHandle: string) {
  return useQuery({
    queryKey: ["product", productHandle],
    queryFn: () => fetchProduct(productHandle),
    enabled: !!productHandle,
  });
}
