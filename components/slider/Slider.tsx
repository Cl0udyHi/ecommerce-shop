"use client";

import classNames from "classnames";
import React from "react";

type SliderProps = {
  className?: string;
  full?: boolean;
  scrollContainerRef?: React.RefObject<HTMLUListElement | null>;
  children: React.ReactNode;
  invisibleScrollbar?: boolean;
};

export default function Slider({
  className,
  children,
  full = true,
  scrollContainerRef,
  invisibleScrollbar: invisible = false,
}: SliderProps) {
  return (
    <div className="w-full relative flex">
      <ul
        ref={scrollContainerRef}
        className={classNames(
          className,
          "min-w-full w-max flex gap-4",
          "scroll-smooth snap-x sm:scroll-px-16 scroll-px-8 snap-mandatory overflow-x-scroll",
          {
            "[&>*]:basis-full [&>*]:sm:basis-[calc((100%-1rem)/2)] [&>*]:lg:basis-[calc((100%-2rem)/3)] [&>*]:2xl:basis-[calc((100%-3rem)/4)]":
              full,
          },
          "[&>*]:snap-always [&>*]:snap-start [&>*]:shrink-0",
          { "scrollbar-invisible": invisible }
        )}
      >
        {children}
      </ul>
    </div>
  );
}
