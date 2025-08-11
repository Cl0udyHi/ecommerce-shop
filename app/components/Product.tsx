"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";
import Add from "@/public/icons/add.svg";

const Product = (params: {
  name: string;
  id: number;
  price: string;
  colors: string[];
  image: StaticImageData;
}) => {
  return (
    <Link
      className="flex flex-col gap-4 group hover:cursor-pointer"
      href={"/products/" + params.id}
    >
      {/* Image */}
      <div className="relative w-full flex justify-center items-start aspect-[201/230] rounded-lg overflow-hidden">
        <Image
          src={params.image}
          alt="Product Picture"
          placeholder="blur"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="sm:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-1 h-max">
          <h2 className="sm:row-start-1 row-start-2 col-start-1 text-base font-bold group-hover:underline">
            {params.name}
          </h2>
          {/* Colors */}
          <div className="sm:col-start-2 row-start-1 col-start-1 flex shrink-0 justify-end gap-2">
            {params.colors.length > 3 && (
              <div className="w-5 h-5 flex justify-center items-center rounded-full border-1 border-natural-700 bg-natural-200">
                <Add className="w-5 h-auto fill-natural-700" />
              </div>
            )}
            {params.colors.slice(0, 3).map((color, index) => (
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
            {params.price}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default Product;
