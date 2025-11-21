"use client";

import { useCollections } from "@/hooks/useCollections";

export default function ProductsList() {
  const { data, isLoading, error } = useCollections();

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error fetching products</>;

  return (
    <ul>
      {data?.map((collection: any) => (
        <li key={collection.node.id}>
          <p>{collection.node.title}</p>
          <ul className="ml-4">
            {collection.node.products.edges.map((productEdge: any) => (
              <li key={productEdge.node.id}>{productEdge.node.title}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
