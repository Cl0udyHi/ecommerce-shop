"use client";

import classNames from "classnames";
import Product from "./product";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/ui/carousel";
import type { Collection } from "@/utils/types";
import { Button } from "@/components/shadcn/ui/button";
import ArrowIcon from "@/public/icons/arrow.svg";
import { useState } from "react";

export default function Collection({ collection }: { collection: Collection }) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className={"flex flex-col gap-4 -mx-auto"}>
      <div className={"w-full flex justify-between items-center sm:px-16 px-8"}>
        <h1 className="col-start-1 row-start-1 font-bold text-2xl">
          {collection.title}
        </h1>
        <div
          className={classNames(
            "flex gap-2",
            "[&>button]:size-fit [&>button]:p-0! [&>button]:aspect-square [&>button]:bg-primary-100 [&>button]:hover:bg-primary-200 [&>button]:rounded!"
          )}
        >
          <Button
            aria-label="Previous"
            onClick={() => api?.scrollPrev()}
            disabled={!api?.canScrollPrev()}
            className={classNames({
              "opacity-50 cursor-not-allowed": !api?.canScrollPrev,
            })}
          >
            <ArrowIcon className="size-8 fill-primary-500 " />
          </Button>
          <Button
            aria-label="Next"
            onClick={() => api?.scrollNext()}
            disabled={!api?.canScrollNext()}
            className={classNames({
              "opacity-50 cursor-not-allowed": !api?.canScrollNext,
            })}
          >
            <ArrowIcon className="size-8 fill-primary-500 rotate-180" />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="sm:ml-12 sm:mr-16 ml-4 mr-8">
          {collection.products.map((product: any, index: number) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Product product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
