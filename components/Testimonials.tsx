"use client";

import React, { useRef } from "react";
import classNames from "classnames";
import { Testimonials } from "@/utils/data";
import Slider from "./slider/Slider";
import Arrows from "./slider/SliderArrows";
import Person from "@/public/icons/person.svg";
import Star_Full from "@/public/icons/star_full.svg";
import Star_Half from "@/public/icons/star_half.svg";
import Star_Empty from "@/public/icons/star_empty.svg";
import { TestimonialType } from "@/utils/types";

export default function TestimonialsContainer(props: { className?: string }) {
  const scrollContainerRef = useRef(null);

  return (
    <div className={classNames("flex flex-col gap-y-4 lg:overflow-hidden")}>
      <div className={classNames(props.className, "flex justify-between")}>
        <h1 className="font-bold text-2xl">Client Testimonials</h1>
        <Arrows scrollContainerRef={scrollContainerRef} />
      </div>

      <Slider
        scrollContainerRef={scrollContainerRef}
        invisibleScrollbar
        className={props.className}
      >
        {Testimonials.map((testimonial, index) => (
          <TestimonialCard testimonial={testimonial} key={index} />
        ))}
      </Slider>
    </div>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-4 p-4 bg-natural-200 rounded-lg"
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
