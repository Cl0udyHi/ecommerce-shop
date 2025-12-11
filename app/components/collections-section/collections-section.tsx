import { getCollections } from "@/lib/shopify/api";
import Collection from "./collection";
import type { Collection as CollectionType } from "@/utils/types";
import { cacheLife } from "next/cache";

export default async function CollectionsSection() {
  const collections = await getCollections();

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
