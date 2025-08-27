import React, { useContext, useRef, useState } from "react";

import type { Collection, Product } from "@/lib/shopify/types";
import CollectionProducts from "./Collection";
import { getCollectionProducts, getProducts } from "@/lib/shopify";

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

  //  return (
  //    <div id="Products" className={classNames("w-full flex flex-col gap-8")}>
  //      {collections.map((collection, index) => (
  //        <div
  //          key={index}
  //          className={classNames(
  //            "w-full flex flex-col gap-4 text-text text-xl font-bold"
  //          )}
  //        >
  //          <div className="w-full grid grid-cols-2 grid-rows-[auto,0] justify-between items-center sm:px-16 px-8">
  //            <h1 className="col-start-1 row-start-1 font-bold text-[1.75rem]">
  //              {collection.name}
  //            </h1>
  //            <div className="col-start-2 row-start-1 lg:hidden flex gap-2 ml-auto">
  //              <button
  //                onClick={() => scroll("LEFT")}
  //                disabled={scrollValue === "LEFT"}
  //                className={classNames(
  //                  "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer transition-opacity duration-100",
  //                  {
  //                    "opacity-50 cursor-not-allowed!": scrollValue === "LEFT",
  //                  }
  //                )}
  //              >
  //                <Arrow className="w-8 h-auto fill-primary-500" />
  //              </button>
  //              <button
  //                onClick={() => scroll("RIGHT")}
  //                disabled={scrollValue === "RIGHT"}
  //                className={classNames(
  //                  "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer transition-opacity duration-100",
  //                  {
  //                    "opacity-50 cursor-not-allowed!": scrollValue === "RIGHT",
  //                  }
  //                )}
  //              >
  //                <Arrow className="w-8 h-auto fill-primary-500 rotate-180" />
  //              </button>
  //            </div>
  //          </div>

  //          <div className="lg:flex w-full absolute justify-between gap-x-4 lg:px-0 sm:px-16 px-8">
  //            <div
  //              ref={scrollContainer}
  //              onScroll={handleScrollValue}
  //              className={classNames(
  //                "w-max flex gap-4 scrollbar-invisible",
  //                "lg:w-full lg:grid-cols-3 2xl:grid-cols-4 lg:grid gap-x-4 gap-y-8",
  //                "scroll-smooth snap-x sm:scroll-px-16 scroll-px-8 snap-mandatory overflow-x-scroll",
  //                "lg:scroll-px-0 sm:px-16 px-8"
  //              )}
  //            >
  //              {collection.products.map((product, index) => (
  //                <Product
  //                  name={product.name}
  //                  width={columnWidth}
  //                  id={product.id}
  //                  price={product.price}
  //                  key={index}
  //                  colors={product.colors}
  //                  image={product.image as StaticImageData}
  //                />
  //              ))}
  //            </div>
  //          </div>
  //        </div>
  //      ))}
  //    </div>
  //  );
};

export default Collections;
