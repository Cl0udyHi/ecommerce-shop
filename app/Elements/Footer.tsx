import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { links, socialMedia } from "@/app/utils/data";

const Footer = () => {
  return (
    <footer
      className={classNames(
        "sm:px-16 w-full flex justify-between sm:flex-nowrap flex-wrap gap-x-4 gap-y-8 items-center px-8 py-8 z-50 bg-primary-400"
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
      <div className="lg:flex hidden w-full flex-col gap-4">
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
