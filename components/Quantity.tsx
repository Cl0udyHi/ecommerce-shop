"use client";

import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
} from "react";

type QuantityProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const Quantity = forwardRef(function Quantity(
  {
    min = 1,
    max = 10,
    defaultValue = min,
    onChange,
    value,
    setValue,
  }: QuantityProps,
  ref
) {
  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + 1;

      onChange?.(newValue);
      setValue?.(newValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - 1;

      onChange?.(newValue);
      setValue?.(newValue);
    }
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
      <button aria-label="Minus" type="button" onClick={handleDecrease}>
        <RemoveIcon className="w-5 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-5 justify-center items-center aspect-square">
        {value}
      </span>
      <button aria-label="Plus" type="button" onClick={handleIncrease}>
        <AddIcon className="w-5 aspect-square fill-natural-700" />
      </button>
    </div>
  );
});

export default Quantity;
