"use client";

import type { Collection } from "@/utils/types";
import { useCollections } from "@/hooks/useCollections";
import classNames from "classnames";
import Product from "./product";
import Slider from "../slider/Slider";
import Arrows from "../slider/SliderArrows";
import { useRef } from "react";

const Collections = () => {
  const { data: collections, isPending, error } = useCollections();

  if (isPending) {
    return <PendingSkeleton />;
  }

  return (
    <>
      {collections?.map((collection: Collection, index: number) => (
        <Collection key={index} collection={collection} />
      ))}
    </>
  );
};

const PendingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="w-full sm:px-16 px-8">
            <div className="h-7 w-4/5 rounded-sm bg-natural-300 animate-pulse" />
          </div>

          <Slider
            invisibleScrollbar
            className={classNames(
              "sm:px-16 px-8",
              "lg:w-full lg:grid-cols-3 2xl:grid-cols-4 lg:grid gap-x-4 gap-y-8",
              "lg:overflow-visible lg:scroll-auto lg:scrollbar-auto lg:snap-none"
            )}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={classNames(
                  "basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] 2xl:basis-[calc((100%-3rem)/4)]",
                  "flex flex-col shrink-0 gap-4 snap-always snap-start"
                )}
              >
                <div className="w-full aspect-201/230 rounded-lg bg-natural-300 animate-pulse" />

                <div className="flex flex-col gap-1">
                  <div className="flex w-full h-max">
                    <div className="sm:row-start-1 row-start-2 col-start-1 h-4 w-3/4 bg-natural-300 rounded-sm animate-pulse" />
                  </div>

                  <div className="h-3.5 w-1/2 bg-natural-300 animate-pulse rounded-sm" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </>
  );
};

const Collection = ({ collection }: { collection: Collection }) => {
  const scrollContainer = useRef(null);

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"w-full flex justify-between items-center sm:px-16 px-8"}>
        <h1 className="col-start-1 row-start-1 font-bold text-[1.75rem]">
          {collection.title}
        </h1>
        <Arrows className="lg:hidden" scrollContainerRef={scrollContainer} />
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
        {collection.products.map((product: any, index: number) => (
          <Product key={index} product={product} />
        ))}
      </Slider>
    </div>
  );
};

export default Collections;
