"use client";

import React, { useContext, useRef, useState } from "react";

import { collections } from "@/app/utils/data";
import Product from "./components/Product";
import classNames from "classnames";
import { StaticImageData } from "next/image";
import Arrow from "@/public/icons/arrow.svg";
import { ScrollDirection } from "@/app/utils/types";

const Products = (props: { className?: string }) => {
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
    <div>
      {collections.map((collection, index) => (
        <div key={index} className={classNames("flex flex-col gap-4")}>
          <div
            className={classNames(
              props.className,
              "w-full grid grid-cols-2 grid-rows-[auto,0] justify-between items-center sm:px-16 px-8"
            )}
          >
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
                "lg:w-auto lg:overflow-visible lg:scroll-auto lg:scrollbar-auto lg:snap-none"
              )}
            >
              {collection.products.map((product, index) => (
                <Product
                  name={product.name}
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

export default Products;
