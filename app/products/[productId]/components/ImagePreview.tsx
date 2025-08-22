"use client";

import classNames from "classnames";
import React from "react";
import Image from "next/image";
import { ProductType } from "@/app/utils/types";

const ImagePreview = (props: { product: ProductType }) => {
  const Product = props.product;

  return (
    <div
      className={classNames(
        "w-full",
        "sm:rounded-lg sm:col-start-1 sm:row-start-1 sm:px-0",
        "flex gap-2"
      )}
    >
      <Image
        src={Product.image}
        alt="Product Image"
        className={classNames(
          "w-full aspect-square object-cover",
          "sm:rounded-lg",
          "md:row-start-1 md:col-start-1"
        )}
        loading="lazy"
      />
      <Thumbnails
        product={Product}
        className={classNames(
          "hidden xl:grid md:grid-cols-1 md:grid-rows-[auto_auto_auto_auto]",
          "md:row-start-1 md:col-start-2"
        )}
      />
    </div>
  );
};

export const Thumbnails = (props: {
  product: ProductType;
  className: string;
}) => {
  const Product = props.product;

  if (!Product) return;

  return (
    <div
      className={classNames(
        "px-8 row-start-3 grid grid-cols-4 grid-rows-1 gap-2",
        "sm:col-start-1 sm:row-start-3 sm:px-0",
        props.className
      )}
    >
      <Image
        src={Product.image}
        alt="Product Image"
        className="w-full aspect-square object-cover bg-natural-200 rounded"
        loading="lazy"
      />
      <Image
        src={Product.image}
        alt="Product Image"
        className="w-full aspect-square object-cover bg-natural-200 rounded"
        loading="lazy"
      />
      <Image
        src={Product.image}
        alt="Product Image"
        className="w-full aspect-square object-cover bg-natural-200 rounded"
        loading="lazy"
      />
      <Image
        src={Product.image}
        alt="Product Image"
        className="w-full aspect-square object-cover bg-natural-200 rounded"
        loading="lazy"
      />
    </div>
  );
};

export default ImagePreview;
