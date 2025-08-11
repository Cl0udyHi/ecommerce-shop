"use client";

import React from "react";
import { links } from "@/app/utils/data";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ isOpen = true }: { isOpen: boolean }) => {
  const pathname = usePathname();

  return (
    <ul
      className={classNames(
        "lg:col-start-2 lg:justify-between lg:gap-x-2 lg:row-start-1 lg:col-span-1 lg:flex-nowrap lg:flex! md:row-start-2 flex gap-x-16 gap-y-2 flex-wrap row-start-3 col-start-1 col-span-2",
        { hidden: !isOpen }
      )}
    >
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
  );
};

export default Navigation;
