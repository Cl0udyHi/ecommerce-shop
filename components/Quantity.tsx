"use client";

import useDebounce from "@/hooks/use-debounce";
import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Quantity({
  disabled = false,
  min,
  max,
  defaultValue,
  name,
  onChange,
}: {
  disabled?: boolean;
  min?: number;
  max?: number;
  defaultValue: number;
  name: string;
  onChange?: (value: number) => void;
}) {
  const [value, setValue] = useState<number>(defaultValue);
  const debouncedValue = useDebounce(value, 300);

  const handleChange = (action: "increment" | "decrement") => {
    if (disabled) return;

    let clampedValue = (i: number) => Math.max(Math.min(i, max), min);
    let newValue = clampedValue(value);

    if (action === "increment") {
      newValue = clampedValue(value + 1);
      setValue(newValue);
    } else {
      newValue = clampedValue(value - 1);
      setValue(newValue);
    }
  };

  useEffect(() => {
    onChange?.(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <button
        aria-label="Minus"
        aria-disabled={disabled}
        type="button"
        onClick={() => handleChange("decrement")}
        className={classNames({ "opacity-50 cursor-not-allowed!": disabled })}
      >
        <RemoveIcon className="w-5 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-5 justify-center items-center aspect-square">
        {value}
        <input
          name={name}
          type="number"
          hidden
          onChange={() => {}}
          value={value}
          required
        />
      </span>
      <button
        aria-label="Plus"
        aria-disabled={disabled}
        type="button"
        onClick={() => handleChange("increment")}
        className={classNames({ "opacity-50 cursor-not-allowed!": disabled })}
      >
        <AddIcon className="w-5 aspect-square fill-natural-700" />
      </button>
    </div>
  );
}

export default Quantity;
