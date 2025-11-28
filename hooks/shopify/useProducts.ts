import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Example fetch function
async function fetchProducts() {
  const query = `
    query Products{
      products(first: 5) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  const { data } = await axios.post("/api/shopify", { query });
  return data.data.products.edges;
}

// Correctly typed useQuery
export function useProducts() {
  return useQuery({
    queryKey: ["products"], // must be an object with queryKey
    queryFn: fetchProducts, // your fetch function
  });
}
