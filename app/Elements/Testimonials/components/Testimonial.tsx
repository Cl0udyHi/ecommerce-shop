"use client";

import React from "react";
import Person from "@/public/icons/person.svg";
import Star_Full from "@/public/icons/star_full.svg";
import Star_Half from "@/public/icons/star_half.svg";
import Star_Empty from "@/public/icons/star_empty.svg";
import { TestimonialType } from "@/app/utils/types";
import classNames from "classnames";

const TestimonialCard = (props: { testimonial: TestimonialType }) => {
  const rating = props.testimonial.rating;

  return (
    <div
      className={classNames(
        "basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] 2xl:basis-[calc((100%-3rem)/4)]",
        "flex flex-col shrink-0 gap-4 p-4 snap-always snap-start bg-natural-200 rounded-lg"
      )}
    >
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-primary-200 rounded-full">
            <Person className="w-6 h-auto fill-primary-400" />
          </div>
          <h1 className="text-base font-bold">{props.testimonial.name}</h1>
        </div>
      </div>
      <p className="text-sm font-normal">{props.testimonial.text}</p>
      <div className="flex mt-auto items-center gap-1">
        {[...Array(Math.trunc(rating))].map((_, index) => (
          <Star_Full key={index} className="w-6 h-auto fill-accent-300" />
        ))}
        {!Number.isInteger(rating) && (
          <Star_Half className="w-6 h-auto fill-accent-300" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <Star_Empty key={index} className="w-6 h-auto fill-accent-300" />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
