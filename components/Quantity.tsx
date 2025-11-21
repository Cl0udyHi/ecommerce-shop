"use client";

import React from "react";
import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";

type QuantityProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  onQuantityChange?: (type: "plus" | "minus") => void;
};

function Quantity({
  value,
  onQuantityChange,
  min = 1,
  max = 10,
  onChange,
}: QuantityProps) {
  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
      onQuantityChange?.("plus");
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
      onQuantityChange?.("minus");
    }
  };

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <button type="button" onClick={handleDecrease}>
        <RemoveIcon className="w-5 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-5 justify-center items-center aspect-square">
        {value}
      </span>
      <button type="button" onClick={handleIncrease}>
        <AddIcon className="w-5 aspect-square fill-natural-700" />
      </button>
    </div>
  );
}

export default Quantity;
