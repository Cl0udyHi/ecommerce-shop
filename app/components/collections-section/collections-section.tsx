import { fetchCollections } from "@/hooks/shopify/useCollections";
import Collection from "./collection";
import type { Collection as CollectionType } from "@/utils/types";
import { cacheLife } from "next/cache";

export default async function CollectionsSection() {
  "use cache";
  cacheLife("hours");

  const collections = await fetchCollections();

  return (
    <>
      {collections.map(
        (collection: CollectionType, index: number) =>
          collection.products.length > 0 && (
            <Collection key={index} collection={collection} />
          )
      )}
    </>
  );
}
