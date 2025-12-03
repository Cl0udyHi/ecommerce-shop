"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/ui/carousel";
import classNames from "classnames";
import { useState } from "react";

export default function CollectionsSkeleton() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="w-full sm:px-16 px-8">
            <div className="h-10.5 w-4/5 rounded-sm bg-natural-300 animate-pulse" />
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
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                >
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
                        <div className="sm:row-start-1 row-start-2 col-start-1 h-6 w-3/4 bg-natural-300 rounded-sm animate-pulse" />
                      </div>

                      <div className="h-5 w-1/2 bg-natural-300 animate-pulse rounded-sm" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ))}
    </>
  );
}
