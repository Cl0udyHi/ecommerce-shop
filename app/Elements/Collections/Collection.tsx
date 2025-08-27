"use client";

import React, { useRef, useState } from "react";

import classNames from "classnames";
import Arrow from "@/public/icons/arrow.svg";
import { ScrollDirection } from "@/utils/types";
import type {
  Collection as CollectionProducts,
  Product,
} from "@/lib/shopify/types";
import ProductComponent from "./Product";

const CollectionProducts = (props: {
  collection: CollectionProducts;
  products: Product[];
  className?: string;
}) => {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: ScrollDirection) => {
    const container = scrollContainer.current;
    const cardWidth = container?.children[0].clientWidth ?? 0;

    if (!container) return;

    if (direction === "LEFT") {
      container.scrollLeft -= cardWidth + 16;
    } else {
      container.scrollLeft += cardWidth - 16;
    }
  };

  const [scrollValue, setScrollValue] = useState<ScrollDirection | null>(
    "LEFT"
  );

  const handleScrollValue = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollValue = element.scrollLeft;

    if (scrollValue == 0) {
      setScrollValue("LEFT");
    } else if (scrollValue >= element.scrollWidth - element.clientWidth) {
      setScrollValue("RIGHT");
    } else {
      setScrollValue(null);
    }
  };

  return (
    <>
      {props.products.length > 0 && (
        <div className={classNames("flex flex-col gap-4")}>
          <div
            className={classNames(
              props.className,
              "w-full grid grid-cols-2 grid-rows-[auto,0] justify-between items-center sm:px-16 px-8"
            )}
          >
            <h1 className="col-start-1 row-start-1 font-bold text-[1.75rem]">
              {props.collection.title}
            </h1>
            <div className="col-start-2 row-start-1 lg:hidden flex gap-2 ml-auto">
              <button
                onClick={() => scroll("LEFT")}
                disabled={scrollValue === "LEFT"}
                className={classNames(
                  "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer transition-opacity duration-100",
                  {
                    "opacity-50 cursor-not-allowed!": scrollValue === "LEFT",
                  }
                )}
              >
                <Arrow className="w-8 h-auto fill-primary-500" />
              </button>
              <button
                onClick={() => scroll("RIGHT")}
                disabled={scrollValue === "RIGHT"}
                className={classNames(
                  "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer transition-opacity duration-100",
                  {
                    "opacity-50 cursor-not-allowed!": scrollValue === "RIGHT",
                  }
                )}
              >
                <Arrow className="w-8 h-auto fill-primary-500 rotate-180" />
              </button>
            </div>
          </div>
          <div
            className={classNames(
              "max-w-full w-full relative flex rounded-lg z-10"
            )}
          >
            <div
              ref={scrollContainer}
              onScroll={handleScrollValue}
              className={classNames(
                props.className,
                "min-w-full w-max flex gap-4 scrollbar-invisible",
                "scroll-smooth snap-x sm:scroll-px-16 scroll-px-8 snap-mandatory overflow-x-scroll",
                "lg:w-full lg:grid-cols-3 2xl:grid-cols-4 lg:grid gap-x-4 gap-y-8",
                "lg:overflow-visible lg:scroll-auto lg:scrollbar-auto lg:snap-none"
              )}
            >
              {props.products.map((product, index) => (
                <ProductComponent key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionProducts;
