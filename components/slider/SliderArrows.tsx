"use client";

import classNames from "classnames";
import ArrowIcon from "@/public/icons/arrow.svg";

import React, { useEffect, useState } from "react";
import { ScrollDirection } from "@/utils/types";

type ArrowsProps = {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  className?: string;
};

export default function Arrows({ className, scrollContainerRef }: ArrowsProps) {
  const [scrollValue, setScrollValue] = useState<ScrollDirection | null>(
    "LEFT"
  );

  const scroll = (direction: ScrollDirection) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.clientWidth ?? 0;
    container.scrollLeft +=
      direction === "LEFT" ? -(cardWidth + 16) : cardWidth - 16;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.clientWidth ?? 0;

    const handleScroll = () => {
      if (container.scrollLeft <= 0 + cardWidth) {
        setScrollValue("LEFT");
      } else if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - cardWidth
      ) {
        setScrollValue("RIGHT");
      } else {
        setScrollValue(null);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className={classNames(className, "flex gap-2")}>
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
        <ArrowIcon className="w-8 h-auto fill-primary-500" />
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
        <ArrowIcon className="w-8 h-auto fill-primary-500 rotate-180" />
      </button>
    </div>
  );
}
