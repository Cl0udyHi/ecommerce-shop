"use client";

import Dropdown from "@/app/components/Dropdown/Dropdown";
import Emoji from "@/app/components/Emoji";
import Globe from "@/public/icons/globe.svg";
import React, { useState } from "react";

const Languages: { label: string; emoji: string }[] = [
  { label: "English", emoji: "🇬🇧" },
  { label: "Français", emoji: "🇫🇷" },
  { label: "العربية", emoji: "🇸🇦" },
];

const LangDropdown = () => {
  const [openLang, setOpenLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  return (
    <Dropdown
      open={openLang}
      setOpen={setOpenLang}
      selected={selectedLang}
      setSelected={setSelectedLang}
    >
      <button className="p-2 rounded-sm cursor-pointer bg-natural-300 hover:bg-natural-400">
        <Globe className="w-5 h-auto fill-natural-700" />
      </button>
      <ul>
        {Languages.map((lang, index) => (
          <li key={index}>
            <div className="w-full flex gap-4 justify-between">
              <span className="text-sm font-semibold">{lang.label}</span>
              <Emoji emoji={lang.emoji} />
            </div>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default LangDropdown;
