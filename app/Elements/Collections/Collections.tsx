import React from "react";

import type { Collection } from "@/lib/shopify/types";
import CollectionProducts from "./Collection";
import { getCollectionProducts } from "@/lib/shopify";

const Collections = (props: { collections: Collection[] }) => {
  return (
    <>
      {props.collections.map(async (collection, index) => {
        const products = await getCollectionProducts({
          collection: collection.handle,
        });

        return (
          <CollectionProducts
            key={index}
            className="sm:px-16 px-8"
            products={products}
            collection={collection}
          />
        );
      })}
    </>
  );
};

export default Collections;
