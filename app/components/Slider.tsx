"use client";

import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";

interface SliderProps {
  children: ReactElement[];
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ children, className = "" }) => {
  return <div className={classNames("w-full", className)}>{children}</div>;
};

export default Slider;
