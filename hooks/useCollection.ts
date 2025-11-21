import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCollection(collectionId: string) {
  const query = `
    query getCollection($id: ID!) {
      collection(id: $id) {
        id
        title
        products(first: 50) {
          edges {
            node {
              id
              title
              description
            }
          }
        }
      }
    }
  `;

  const { data } = await axios.post("/api/shopify", {
    query,
    variables: { id: collectionId },
  });

  // Map edges -> node for products
  const collection = data.data.collection;
  collection.products = collection.products.edges.map((edge: any) => edge.node);

  return collection;
}

export function useCollection(collectionId: string) {
  return useQuery({
    queryKey: ["collection", collectionId],
    queryFn: () => fetchCollection(collectionId), // pass function, not result
    enabled: !!collectionId, // only run if collectionId exists
  });
}
