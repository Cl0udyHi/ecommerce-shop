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
  const [isLeftArrowDisabled, setIsLeftArrowDisabled] =
    useState<boolean>(false);
  const [isRightArrowDisabled, setIsRightArrowDisabled] =
    useState<boolean>(false);

  const scroll = (direction: ScrollDirection) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.clientWidth ?? 0;
    container.scrollLeft +=
      direction === "LEFT" ? -(cardWidth + 16) : cardWidth - 16;

    console.log(container.scroll);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.clientWidth ?? 0;

    const handleScroll = () => {
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const maxScrollLeft =
        container.scrollWidth - container.clientWidth - cardWidth;

      setIsLeftArrowDisabled(scrollLeft <= cardWidth);
      setIsRightArrowDisabled(scrollLeft >= maxScrollLeft);
    };

    container.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={classNames(className, "flex gap-2")}>
      <button
        onClick={() => scroll("LEFT")}
        disabled={isLeftArrowDisabled}
        className={classNames(
          "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer transition-opacity duration-100",
          {
            "opacity-50 cursor-not-allowed!": isLeftArrowDisabled,
          }
        )}
      >
        <ArrowIcon className="w-8 h-auto fill-primary-500" />
      </button>
      <button
        onClick={() => scroll("RIGHT")}
        disabled={isRightArrowDisabled}
        className={classNames(
          "w-fit h-fit aspect-square grow-0 bg-primary-100 rounded cursor-pointer transition-opacity duration-100",
          {
            "opacity-50 cursor-not-allowed!": isRightArrowDisabled,
          }
        )}
      >
        <ArrowIcon className="w-8 h-auto fill-primary-500 rotate-180" />
      </button>
    </div>
  );
}
