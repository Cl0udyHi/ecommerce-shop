import Image from "next/image";
import React from "react";
import Link from "next/link";
import Add from "@/public/icons/add.svg";
import classNames from "classnames";
import type { Product } from "@/utils/types";

const Product = (props: { product: Product }) => {
  // const Colors = Array.from(
  //   new Set(
  //     props.product.variants
  //       .map(
  //         (variant) =>
  //           variant.selectedOptions.find((opt) => opt.name === "Color")?.value
  //       )
  //       .filter(Boolean)
  //       .map((c) => c?.trim().toLowerCase())
  //   )
  // );

  return (
    <Link
      className={classNames(
        "basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] 2xl:basis-[calc((100%-3rem)/4)]",
        "flex flex-col shrink-0 gap-4 snap-always snap-start"
      )}
      href={"/products/" + props.product.handle}
    >
      {/* Image */}
      <Image
        src={props.product.featuredImage.url}
        blurDataURL={`${props.product.featuredImage.url}&width=10`}
        alt={props.product.featuredImage.altText ?? ""}
        width={props.product.featuredImage.width}
        height={props.product.featuredImage.height}
        placeholder="blur"
        className="object-cover w-full aspect-201/230 rounded-lg"
      />

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="sm:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-2 h-max">
          <h2 className="sm:row-start-1 row-start-2 col-start-1 text-base font-bold group-hover:underline">
            {props.product.title}
          </h2>
          {/* Colors */}
          <div className="sm:col-start-2 row-start-1 col-start-1 flex shrink-0 justify-end gap-2">
            {/* {Colors.length > 3 && (
              <div className="w-5 h-5 flex justify-center items-center rounded-full border border-natural-700 bg-natural-200">
                <Add className="w-5 h-auto fill-natural-700" />
              </div>
            )}
            {Colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className={`shrink-0 w-5 h-5 rounded-full border border-natural-700`}
                style={{ backgroundColor: color }}
              ></div>
            ))} */}
          </div>
        </div>

        <span className="text-sm text-natural-600 font-medium">
          {props.product.priceRange.minVariantPrice.amount}{" "}
          {props.product.priceRange.minVariantPrice.currencyCode}
        </span>
      </div>
    </Link>
  );
};

export default Product;
