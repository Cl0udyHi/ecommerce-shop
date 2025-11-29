import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";
import { forwardRef, useImperativeHandle, useState } from "react";

type QuantityProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
};

const Quantity = forwardRef(function Quantity(
  { min = 1, max = 10, defaultValue = min }: QuantityProps,
  ref
) {
  const [value, setValue] = useState(defaultValue);

  const handleIncrease = () => {
    if (value < max) setValue?.(value + 1);
  };

  const handleDecrease = () => {
    if (value > min) setValue?.(value - 1);
  };

  useImperativeHandle(ref, () => ({
    setValueFromOutside(newVal: number) {
      // Clamp the value
      const clamped = Math.min(max, Math.max(min, newVal));
      setValue(clamped);
    },
    getValue() {
      return value;
    },
  }));

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <input
        type="number"
        name="quantity"
        value={value}
        onChange={() => {}}
        hidden
        required
      />
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
});

export default Quantity;
