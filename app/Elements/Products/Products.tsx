"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";

import { collections } from "@/app/utils/data";
import Product from "./components/Product";
import { calcWidth } from "../../utils/CalcWidth";
import classNames from "classnames";
import { StaticImageData } from "next/image";
import Arrow from "@/public/icons/arrow.svg";
import { ScrollDirection } from "@/app/utils/types";

const Products = () => {
  const parent: RefObject<HTMLDivElement | null> = useRef(null);

  const [childWidth, setChildWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setChildWidth(
        calcWidth({
          container: parent.current,
          colsSize: { base: 1, sm: 2, lg: 3 },
          gap: 16,
        })
      );
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    if (parent.current) {
      resizeObserver.observe(parent.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: ScrollDirection) => {
    const container = scrollContainer.current;
    if (!container) return;

    if (direction === "LEFT") {
      container.scrollLeft -= childWidth + 16;
    } else {
      container.scrollLeft += childWidth - 16;
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
    <div id="Products" className="w-full flex flex-col gap-8">
      {collections.map((collection, index) => (
        <div
          key={index}
          className={classNames(
            "w-full flex flex-col gap-4 text-text text-xl font-bold"
          )}
        >
          <div className="w-full grid grid-cols-2 grid-rows-[auto,0] justify-between items-center sm:px-16 px-8">
            <h1 className="col-start-1 row-start-1 font-bold text-[1.75rem]">
              {collection.name}
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
            <div
              ref={parent}
              className="col-start-1 row-start-2 col-span-2 w-full"
            ></div>
          </div>

          <div
            ref={scrollContainer}
            onScroll={handleScrollValue}
            className={classNames(
              "w-full overflow-scroll overflow-y-hidden snap-always scroll-smooth sm:scroll-px-16 scroll-px-8 scrollbar-invisible snap-x snap-mandatory",
              "lg:w-auto lg:overflow-visible lg:scroll-auto lg:scrollbar-auto lg:snap-none"
            )}
          >
            <div
              className={classNames(
                "w-max flex gap-4 sm:px-16 px-8",
                "lg:w-full lg:grid-cols-3 lg:grid gap-x-4 gap-y-8"
              )}
            >
              {collection.products.map((product, index) => (
                <Product
                  name={product.name}
                  width={childWidth}
                  id={product.id}
                  price={product.price}
                  key={index}
                  colors={product.colors}
                  image={product.image as StaticImageData}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
