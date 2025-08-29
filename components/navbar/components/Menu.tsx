"use client";

import classNames from "classnames";
import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";

import { links } from "@/utils/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";

const Menu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div
      className={classNames(
        "fixed h-full top-0 right-0 flex justify-end transition-[width] duration-[5s] overflow-hidden",
        {
          "w-0": !isOpen,
        }
      )}
    >
      <div
        ref={ref}
        className={classNames(
          "relative min-w-80 w-auto h-full flex flex-col p-8 gap-4 bg-natural-300"
        )}
      >
        <h1 className="text-xl text-primary-500 font-black">NAVIGATION</h1>
        <ul className="space-y-3">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                className={classNames(
                  "text-sm text-natural-700 hover:text-natural-600 font-semibold hover:border-b-2 border-natural-700 hover:border-natural-600 border-offset-8",
                  {
                    "text-primary-500 border-b-2 hover:text-primary-400 border-primary-500 hover:border-primary-400":
                      link.href == pathname,
                  }
                )}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
