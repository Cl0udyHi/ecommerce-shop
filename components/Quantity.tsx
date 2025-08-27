import React, { useState } from "react";
import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";

type QuantityProps = {
  min?: number;
  max?: number;
};

function Quantity({ min = 1, max = 10 }: QuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const Increase = () => {
    setQuantity((prev) => Math.min(prev + 1, max));
  };

  const Decrease = () => {
    setQuantity((prev) => Math.max(min, prev - 1));
  };

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <button type="button" onClick={Decrease}>
        <RemoveIcon className="w-5 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-5 justify-center items-center aspect-square">
        {quantity}
      </span>
      <button type="button" onClick={Increase}>
        <AddIcon className="w-5 aspect-square fill-natural-700" />
      </button>
    </div>
  );
}

export default Quantity;
