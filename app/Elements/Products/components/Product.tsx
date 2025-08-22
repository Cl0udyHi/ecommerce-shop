"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";
import Add from "@/public/icons/add.svg";
import classNames from "classnames";

const Product = (props: {
  name: string;
  id: string;
  price: string;
  colors: string[];
  image: StaticImageData;
}) => {
  return (
    <Link
      className={classNames(
        "basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] 2xl:basis-[calc((100%-3rem)/4)]",
        "flex flex-col shrink-0 gap-4 snap-always snap-start"
      )}
      href={"/products/" + props.id}
    >
      {/* Image */}
      <Image
        src={props.image}
        blurDataURL={props.image.blurDataURL}
        alt="Product Picture"
        width={201}
        height={230}
        placeholder="blur"
        className="object-cover w-full aspect-[201/230] rounded-lg"
      />

      {/* Info */}
      <div className="flex flex-col">
        <div className="sm:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-1 h-max">
          <h2 className="sm:row-start-1 row-start-2 col-start-1 text-base font-bold group-hover:underline">
            {props.name}
          </h2>
          {/* Colors */}
          <div className="sm:col-start-2 row-start-1 col-start-1 flex shrink-0 justify-end gap-2">
            {props.colors.length > 3 && (
              <div className="w-5 h-5 flex justify-center items-center rounded-full border-1 border-natural-700 bg-natural-200">
                <Add className="w-5 h-auto fill-natural-700" />
              </div>
            )}
            {props.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className={`shrink-0 w-5 h-5 rounded-full border-1 border-natural-700`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>

        {/* <div className="flex justify-between gap-4 items-start"></div> */}
        <div className="row-start-2 col-span-2 flex gap-1 items-center">
          <svg
            className="h-[14px] w-auto fill-natural-600"
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 1124.14 1256.39"
          >
            <path
              className="cls-1"
              d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
            />
            <path
              className="cls-1"
              d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
            />
          </svg>
          <h3 className="text-sm text-natural-600 font-medium">
            {props.price}
          </h3>
        </div>
      </div>

      {/* Buttons */}
      {/* <div className="flex gap-4 mt-auto">
        <button className="text-sm font-semibold w-full py-2 bg-primary-400 rounded text-natural-100 cursor-pointer">
          Add to Cart
        </button>
        <button className="text-sm font-semibold w-full py-2 bg-natural-200 rounded text-natural-700 cursor-pointer">
          Details
        </button>
      </div> */}
    </Link>
  );
};

export default Product;
