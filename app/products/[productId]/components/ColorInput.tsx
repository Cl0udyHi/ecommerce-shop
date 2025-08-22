"use client";

import React from "react";
import CheckmarkIcon from "@/public/icons/checkmark.svg";
import { getContrastColor } from "@/app/utils/color";

const ColorInput = (props: { color: string }) => {
  return (
    <div
      className="peer-checked:[&>svg]:block w-10 h-10 flex justify-center items-center bg-natural-200 border border-natural-700 rounded-full cursor-pointer"
      style={{ backgroundColor: props.color }}
    >
      <CheckmarkIcon
        className="hidden w-5 h-auto fill-natural-700"
        style={{ fill: getContrastColor(props.color) }}
      />
    </div>
  );
};

export default ColorInput;
