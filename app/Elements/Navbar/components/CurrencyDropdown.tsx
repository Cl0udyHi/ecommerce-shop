"use client";

import Dropdown from "@/app/components/Dropdown/Dropdown";
import Emoji from "@/app/components/Emoji";
import DropdownArrow from "@/public/icons/dropdown_arrow.svg";
import classNames from "classnames";
import React, { useState } from "react";

const Currencies: { label: string; emoji: string }[] = [
  {
    label: "USD",
    emoji: "🇺🇸",
  },
  {
    label: "EUR",
    emoji: "🇪🇺",
  },
  {
    label: "SAR",
    emoji: "🇸🇦",
  },
  {
    label: "DZD",
    emoji: "🇩🇿",
  },
];

const CurrencyDropDown = () => {
  const [openCurrencies, setOpenCurrencies] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(2);

  return (
    <Dropdown
      open={openCurrencies}
      setOpen={setOpenCurrencies}
      selected={selectedCurrency}
      setSelected={setSelectedCurrency}
    >
      <button
        className={classNames(
          "relative flex justify-end p-2 rounded-sm cursor-pointer bg-natural-300 hover:bg-natural-400"
        )}
      >
        <span className="px-1 text-sm text-natural-700 font-semibold">
          {Currencies[selectedCurrency].label}
        </span>
        <DropdownArrow
          className={classNames(
            "w-5 h-auto fill-natural-700 transition-transform",
            {
              "rotate-x-180": openCurrencies,
            }
          )}
        />
      </button>

      <ul>
        {Currencies.map((props, index) => (
          <li key={index}>
            <div className="w-full flex gap-4 justify-between">
              <span className="text-sm font-semibold">{props.label}</span>
              <Emoji emoji={props.emoji} />
            </div>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default CurrencyDropDown;
