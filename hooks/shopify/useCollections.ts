"use server";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Collection, Collections } from "@/utils/types";
import { shopifyFetch, unwrapEdges } from "@/utils/shopify/shopify";

export async function fetchCollections() {
  const query = `
        query getCollections {
            collections(first: 50) {
                edges {
                    node {
                        id
                        handle
                        title
                      	products (first: 50) {
                        	edges {
                            node {
                              id
                              title
                              handle
                              featuredImage {
                                id
                                altText
                                height
                                width
                                url
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
                            }
                          }
                      }
                    }
                }
            }
        }
   `;

  const data: any = await shopifyFetch(query);

  return unwrapEdges(data.data.collections) as Collection[];
}

// export function useCollections() {
//   return useQuery({
//     queryKey: ["collections"],
//     queryFn: fetchCollections,
//   });
// }
