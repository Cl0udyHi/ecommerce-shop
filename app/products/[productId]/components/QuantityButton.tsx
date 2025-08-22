"use client";

import { useState } from "react";
import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";

export default function QuantityButton() {
  const [quantity, setQuantity] = useState(1);

  const Increase = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const Decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <button type="button" onClick={Decrease}>
        <RemoveIcon className="w-6 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-6 justify-center items-center aspect-square">
        {quantity}
      </span>
      <button type="button" onClick={Increase}>
        <AddIcon className="w-6 aspect-square fill-natural-700" />
      </button>
    </div>
  );
}
