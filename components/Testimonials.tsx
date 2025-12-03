"use client";

import { useState } from "react";
import classNames from "classnames";
import { Testimonials } from "@/utils/data";

import ArrowIcon from "@/public/icons/arrow.svg";
import Person from "@/public/icons/person.svg";
import Star_Full from "@/public/icons/star_full.svg";
import Star_Half from "@/public/icons/star_half.svg";
import Star_Empty from "@/public/icons/star_empty.svg";
import { TestimonialType } from "@/utils/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./shadcn/ui/carousel";
import { Button } from "./shadcn/ui/button";
import Autoplay from "embla-carousel-autoplay";

export default function TestimonialsContainer(props: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className={classNames("flex flex-col gap-y-4 lg:overflow-hidden")}>
      <div className={classNames(props.className, "flex justify-between")}>
        <h1 className="font-bold text-2xl">Client Testimonials</h1>
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
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="sm:ml-12 sm:mr-16 ml-4 mr-8">
          {Testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
            >
              <TestimonialCard testimonial={testimonial} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <div
      className={classNames(
        "flex flex-col h-full gap-4 p-4 bg-natural-200 rounded-lg"
      )}
    >
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-primary-200 rounded-full">
            <Person className="w-6 h-auto fill-primary-400" />
          </div>
          <h1 className="text-base font-bold">{testimonial.name}</h1>
        </div>
      </div>
      <p className="text-sm font-normal">{testimonial.text}</p>
      <div className="flex mt-auto items-center gap-1">
        {[...Array(Math.trunc(testimonial.rating))].map((_, index) => (
          <Star_Full key={index} className="w-6 h-auto fill-accent-300" />
        ))}
        {!Number.isInteger(testimonial.rating) && (
          <Star_Half className="w-6 h-auto fill-accent-300" />
        )}
        {[...Array(5 - Math.ceil(testimonial.rating))].map((_, index) => (
          <Star_Empty key={index} className="w-6 h-auto fill-accent-300" />
        ))}
      </div>
    </div>
  );
};
