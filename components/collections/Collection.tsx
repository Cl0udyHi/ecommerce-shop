"use client";

import React, { useRef } from "react";

import classNames from "classnames";
import type {
  Collection as CollectionProducts,
  Product,
} from "@/lib/shopify/types";
import ProductComponent from "./Product";
import Arrows from "../slider/SliderArrows";
import Slider from "../slider/Slider";

const CollectionProducts = (props: {
  collection: CollectionProducts;
  products: Product[];
  className?: string;
}) => {
  const scrollContainer = useRef(null);

  return (
    <>
      {props.products.length > 0 && (
        <div className={classNames("flex flex-col gap-4")}>
          <div
            className={classNames(
              props.className,
              "w-full flex justify-between items-center sm:px-16 px-8"
            )}
          >
            <h1 className="col-start-1 row-start-1 font-bold text-[1.75rem]">
              {props.collection.title}
            </h1>
            <Arrows
              className="lg:hidden"
              scrollContainerRef={scrollContainer}
            />
          </div>

          <Slider
            scrollContainerRef={scrollContainer}
            invisibleScrollbar
            className={classNames(
              "sm:px-16 px-8",
              "lg:w-full lg:grid-cols-3 2xl:grid-cols-4 lg:grid gap-x-4 gap-y-8",
              "lg:overflow-visible lg:scroll-auto lg:scrollbar-auto lg:snap-none"
            )}
          >
            {props.products.map((product, index) => (
              <ProductComponent key={index} product={product} />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default CollectionProducts;
