"use client";

import Dropdown from "@/components/Dropdown";
import Emoji from "@/components/Emoji";
import DropdownArrow from "@/public/icons/dropdown_arrow.svg";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

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
  const [openCurrencies, setOpenCurrencies] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(0);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )currency=([^;]+)/);
    const index = match ? Currencies.findIndex((c) => c.label === match[1]) : 0;
    setSelectedCurrency(index >= 0 ? index : 0);
  }, []);

  useEffect(() => {
    const currency = Currencies[selectedCurrency].label;
    document.cookie = `currency=${currency}; path=/;`;
  }, [selectedCurrency]);

  return (
    <Dropdown
      open={openCurrencies}
      setOpen={setOpenCurrencies}
      selected={selectedCurrency}
      setSelected={setSelectedCurrency}
    >
      <button
        aria-label="Currencies"
        className={classNames(
          "relative flex justify-end p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300"
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
