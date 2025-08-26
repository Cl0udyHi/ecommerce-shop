"use client";

import React, { useRef, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";
import classNames from "classnames";
import { Testimonials } from "@/app/utils/data";
import Testimonial from "@/app/Elements/Testimonials/components/Testimonial";
import { ScrollDirection } from "@/app/utils/types";

const TestimonialsContainer = (props: { className?: string }) => {
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
    <div className={classNames("flex flex-col gap-y-4 lg:overflow-hidden")}>
      <div className={classNames(props.className, "flex justify-between")}>
        <h1 className="font-bold text-2xl">Client Testimonials</h1>
        <div className="flex gap-2">
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
          onScroll={(e) => handleScrollValue(e)}
          className={classNames(
            props.className,
            "w-max flex gap-4 scrollbar-invisible",
            "scroll-smooth snap-x sm:scroll-px-16 scroll-px-8 snap-mandatory overflow-x-scroll"
          )}
        >
          {Testimonials.map((testimonial, index) => (
            <Testimonial testimonial={testimonial} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsContainer;
