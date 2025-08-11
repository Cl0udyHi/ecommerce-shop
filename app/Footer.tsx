"use client";

import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { links } from "@/app/utils/data";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const socialMedia = [
    {
      name: "Instagram",
      href: "/",
    },
    {
      name: "Twitter (X)",
      href: "/",
    },
    {
      name: "Tiktok",
      href: "/",
    },
    {
      name: "Facebook",
      href: "/",
    },
  ];

  return (
    <footer
      className={classNames(
        "w-full flex justify-between gap-4 items-center px-16 py-8 z-50 bg-primary-400"
      )}
    >
      <div className="w-full flex flex-col gap-4">
        <Link className="font-black text-2xl text-accent-100" href={"/"}>
          WAVIN
        </Link>
        <p className="text-sm text-primary-100 font-normal">
          Premium fashion for the modern lifestyle. Quality craftsmanship meets
          contemporary design.
        </p>
        <div className="space-y-1">
          <p className="text-sm text-natural-100 font-medium">
            support@wavin.shop
          </p>
          <p className="text-sm text-natural-100 font-medium">
            +966 55 123 4567
          </p>
        </div>
      </div>
      <div className="md:flex hidden w-full flex-col gap-4">
        <h1 className="text-base text-natural-100 font-bold">Navigation</h1>
        <ul className="w-full flex flex-col justify-between gap-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                className={classNames({
                  "text-sm text-primary-100 hover:text-primary-200 font-semibold": true,
                })}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-base text-natural-100 font-bold">Social Media</h1>
        <ul className="w-full flex flex-col justify-between gap-2">
          {socialMedia.map((social, index) => (
            <li key={index}>
              <Link
                className={classNames({
                  "text-sm text-primary-100 hover:text-primary-200 font-semibold": true,
                })}
                href={social.href}
                target="_blank"
              >
                {social.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
