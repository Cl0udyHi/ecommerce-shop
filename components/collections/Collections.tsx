"use client";

import CollectionProducts from "./Collection";
import { Collection } from "@/utils/types";
import { useCollections } from "@/hooks/useCollections";

const Collections = () => {
  const { data: collections, isPending, error } = useCollections();

  return (
    <>
      {isPending ? (
        <></>
      ) : (
        <>
          {collections!.map((collection: Collection, index: number) => (
            <CollectionProducts
              key={index}
              className="sm:px-16 px-8"
              products={collection.products}
              collection={collection}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Collections;
