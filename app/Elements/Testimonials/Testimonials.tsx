"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";
import classNames from "classnames";
import Testimonial from "./components/Testimonial";
import { flushSync } from "react-dom";
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

let colsSize = 2;

const TestimonialsContainer = () => {
  const testimonials: RefObject<HTMLDivElement | null> = useRef(null);
  const parent: RefObject<HTMLDivElement | null> = useRef(null);

  const [childWidth, setChildWidth] = useState(0);

  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([
    ...Testimonials,
  ]);

  // Calculate the width of each testimonial card based on the parent container size
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

  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: ScrollDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const TestimonialsContainer = testimonials.current;
    if (!TestimonialsContainer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const duration = prefersReducedMotion ? 0 : 500;

    if (direction === "LEFT") {
      flushSync(() => {
        setTestimonialsList((prev) => {
          const updated = [...prev];
          const lastItem = updated.pop();
          if (lastItem !== undefined) {
            updated.unshift(lastItem);
          }
          return updated;
        });
      });

      TestimonialsContainer.animate(
        [
          { transform: `translateX(calc(-${childWidth}px - 1rem))` },
          { transform: "translateX(0%)" },
        ],
        {
          duration,
          easing: "ease-in-out",
          fill: "forwards",
        }
      ).finished.then(() => {
        setIsAnimating(false);
      });
    } else {
      TestimonialsContainer.animate(
        [
          { transform: "translateX(0%)" },
          { transform: `translateX(calc(-${childWidth}px - 1rem))` },
        ],
        {
          duration,
          easing: "ease-in-out",
          fill: "forwards",
        }
      ).finished.then(() => {
        flushSync(() => {
          setTestimonialsList((prev) => {
            const updated = [...prev];
            const firstItem = updated.shift();
            if (firstItem !== undefined) {
              updated.push(firstItem);
            }
            return updated;
          });
        });

        TestimonialsContainer.animate([{ transform: "translateX(0%)" }], {
          duration: 0,
          fill: "forwards",
        });

        setIsAnimating(false);
      });
    }
  };

  // Auto scrolling
  useEffect(() => {
    if (isHovered == true) return;

    const interval = setInterval(() => scroll("RIGHT"), 2000);
    return () => clearInterval(interval);
  }, [childWidth, isHovered]);

  return (
    <div
      className="flex flex-col gap-y-4 sm:px-16 px-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Client Testimonials</h1>
        <div className="lg:hidden flex gap-2">
          <button
            onClick={() => scroll("LEFT")}
            disabled={isAnimating}
            className={classNames(
              "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer"
            )}
          >
            <Arrow className="w-8 h-auto fill-primary-500" />
          </button>
          <button
            onClick={() => scroll("RIGHT")}
            disabled={isAnimating}
            className={classNames(
              "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer"
            )}
          >
            <Arrow className="w-8 h-auto fill-primary-500 rotate-180" />
          </button>
        </div>
      </div>

      <div
        ref={parent}
        className={classNames(
          "max-w-full w-full relative flex rounded-lg overflow-hidden z-10"
        )}
      >
        <div className="lg:flex hidden w-full h-full absolute justify-between gap-x-4">
          <button
            onClick={() => scroll("LEFT")}
            disabled={isAnimating}
            className={classNames(
              "md:flex hidden shrink-0 items-center justify-center bg-gradient-to-r to-[#b0b7e800] from-natural-100 transition-opacity cursor-pointer z-20"
            )}
            style={{ width: `${childWidth / 16}rem` }}
          >
            <Arrow className="w-8 h-auto fill-natural-700" />
          </button>
          <button
            onClick={() => scroll("RIGHT")}
            disabled={isAnimating}
            className={classNames(
              "ml-auto shrink-0 flex items-center justify-center bg-gradient-to-r to-natural-100 from-[#b0b7e800] transition-opacity cursor-pointer z-20"
            )}
            style={{ width: `${childWidth / 16}rem` }}
          >
            <Arrow className="w-8 h-auto fill-natural-700 rotate-180" />
          </button>
        </div>

        <div
          ref={testimonials}
          className={classNames(
            "w-max flex flex-none gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory"
          )}
        >
          {testimonialsList.map((testimonial, index) => (
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
