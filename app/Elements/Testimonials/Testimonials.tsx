"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";
import classNames from "classnames";
import Testimonial from "./components/Testimonial";
import { calcWidth } from "@/app/utils/CalcWidth";

type ScrollDirection = "LEFT" | "RIGHT";

type Testimonial = {
  name: string;
  text: string;
  rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
};

const Testimonials: Testimonial[] = [
  {
    name: "Amelia Carter",
    text: "Absolutely love shopping at WAVIN! The quality of their products is top-notch and delivery is always on time.",
    rating: 5,
  },
  {
    name: "Liam Thompson",
    text: "Great customer service! I had an issue with my order, and they resolved it within hours. Highly recommend WAVIN.",
    rating: 4.5,
  },
  {
    name: "Sophia Martinez",
    text: "The packaging was beautiful and eco-friendly. You can tell WAVIN really cares about their customers.",
    rating: 5,
  },
  {
    name: "Ethan Walker",
    text: "Good variety of products, but some items sell out quickly. Overall, very happy with my purchases.",
    rating: 4,
  },
  {
    name: "Isabella Nguyen",
    text: "This is my go-to shop for gifts. The quality, presentation, and service are unmatched.",
    rating: 5,
  },
  {
    name: "Mason Lee",
    text: "Products are as described and feel premium. Shipping could be a bit faster, but still worth it.",
    rating: 4,
  },
  {
    name: "Olivia Scott",
    text: "Love the attention to detail! My order came with a handwritten thank-you card—such a nice touch.",
    rating: 4.5,
  },
  {
    name: "Noah Kim",
    text: "The product photos match the real items perfectly. No surprises, just great quality.",
    rating: 5,
  },
  {
    name: "Ava Rodriguez",
    text: "I’ve shopped here multiple times and WAVIN never disappoints. Consistently excellent.",
    rating: 5,
  },
  {
    name: "James Patel",
    text: "Solid quality and fair pricing. Could use more size options, but overall very satisfied.",
    rating: 4,
  },
];

const TestimonialsContainer = () => {
  const testimonials: RefObject<HTMLDivElement | null> = useRef(null);
  const parent: RefObject<HTMLDivElement | null> = useRef(null);

  const [childWidth, setChildWidth] = useState(0);

  //Calculate Width
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
    } else if (scrollValue == element.scrollWidth - element.clientWidth) {
      setScrollValue("RIGHT");
    } else {
      setScrollValue(null);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 lg:px-16 lg:overflow-hidden">
      <div ref={parent} className="flex justify-between lg:mx-0 sm:mx-16 mx-8">
        <h1 className="font-bold text-2xl">Client Testimonials</h1>
        <div className="lg:hidden flex gap-2">
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
        <div className="lg:flex hidden w-full h-full absolute justify-between gap-x-4 lg:px-0 sm:px-16 px-8">
          <button
            onClick={() => scroll("LEFT")}
            disabled={scrollValue === "LEFT"}
            className={classNames(
              "md:flex hidden shrink-0 items-center justify-center bg-gradient-to-r to-[#b0b7e800] from-natural-100 transition-opacity duration-100 cursor-pointer z-20",
              { "opacity-0 pointer-events-none": scrollValue === "LEFT" }
            )}
            style={{ width: `${childWidth / 16}rem` }}
          >
            <Arrow className="w-8 h-auto fill-natural-700" />
          </button>
          <button
            onClick={() => scroll("RIGHT")}
            disabled={scrollValue === "RIGHT"}
            className={classNames(
              "ml-auto shrink-0 flex items-center justify-center bg-gradient-to-r to-natural-100 from-[#b0b7e800] transition-opacity duration-100 cursor-pointer z-20",
              { "opacity-0 pointer-events-none": scrollValue === "RIGHT" }
            )}
            style={{ width: `${childWidth / 16}rem` }}
          >
            <Arrow className="w-8 h-auto fill-natural-700 rotate-180" />
          </button>
        </div>

        <div
          ref={scrollContainer}
          onScroll={(e) => handleScrollValue(e)}
          className={classNames(
            "w-max flex gap-4 lg:px-0 sm:px-16 px-8 scrollbar-invisible",
            "scroll-smooth snap-x sm:scroll-px-16 scroll-px-8 snap-mandatory overflow-x-scroll",
            "lg:scroll-px-0"
          )}
        >
          {Testimonials.map((testimonial, index) => (
            <Testimonial
              testimonial={testimonial}
              width={childWidth}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsContainer;

export { Testimonial, Testimonials };
