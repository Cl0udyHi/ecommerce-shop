"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Bag from "@/public/icons/bag.svg";
import LangDropdown from "./components/LangDropdown";
import CurrencyDropDown from "./components/CurrencyDropdown";
import MenuIcon from "@/public/icons/menu.svg";
import CloseIcon from "@/public/icons/close.svg";
import { usePathname } from "next/navigation";
import { links } from "@/app/utils/data";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={classNames(
        "w-full grid grid-rows-1 gap-4 items-center sm:px-16 px-8 py-4 sticky top-0 z-50 bg-natural-100",
        "grid-cols-2 lg:grid-cols-3",
        {
          "shadow-shadow-100 shadow-sm transition-shadow": isScrolled,
        }
      )}
    >
      <div className="col-start-1 row-start-1">
        <Link className="text-2xl text-primary-400 font-black" href={"/"}>
          WAVIN
        </Link>
      </div>

      <Navigation isOpen={isMenuOpen} />

      <div
        className={classNames(
          "lg:col-start-3 lg:row-start-1 col-start-2 row-start-2 shrink-0 w-full lg:flex! flex justify-end gap-4",
          { hidden: !isMenuOpen }
        )}
      >
        <CurrencyDropDown />

        <div className="flex gap-2">
          <LangDropdown />

          <button className="p-2 rounded-sm cursor-pointer bg-accent-500 hover:bg-accent-400">
            <Bag className="w-5 h-auto fill-accent-100" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={classNames(
          "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300",
          "lg:hidden!"
        )}
      >
        {isMenuOpen ? (
          <CloseIcon className="w-5 h-auto fill-natural-700" />
        ) : (
          <MenuIcon className="w-5 h-auto fill-natural-700" />
        )}
      </button>
    </nav>
  );
};

const Navigation = ({ isOpen = true }: { isOpen: boolean }) => {
  const pathname = usePathname();

  return (
    <ul
      className={classNames(
        "lg:col-start-2 lg:justify-between lg:gap-x-2 lg:row-start-1 lg:col-span-1 lg:flex-nowrap lg:flex! md:row-start-2 flex gap-x-16 gap-y-2 flex-wrap row-start-3 col-start-1 col-span-2",
        { hidden: !isOpen }
      )}
    >
      {links.map((link, index) => {
        const isActive = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);

        return (
          <li key={index}>
            <Link
              className={classNames(
                "text-sm text-natural-700 hover:text-natural-600 font-semibold hover:border-b-2 border-natural-700 hover:border-natural-600 border-offset-8",
                {
                  "text-primary-500 border-b-2 hover:text-primary-400 border-primary-500 hover:border-primary-400":
                    isActive,
                }
              )}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
