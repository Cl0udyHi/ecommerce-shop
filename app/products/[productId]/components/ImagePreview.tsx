"use client";

import classNames from "classnames";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/shopify/types";

const ImagePreview = (props: { product: Product }) => {
  return (
    <div
      className={classNames(
        "w-full",
        "sm:rounded-lg sm:col-start-1 sm:row-start-1 sm:px-0",
        "flex gap-2"
      )}
    >
      <Image
        src={props.product.images[0].url}
        blurDataURL={`${props.product.images[0].url}?width=10`}
        alt={props.product.images[0].altText}
        className={classNames(
          "w-full aspect-square object-cover",
          "sm:rounded-lg",
          "md:row-start-1 md:col-start-1"
        )}
        loading="lazy"
      />
      <Thumbnails
        product={props.product}
        className={classNames(
          "hidden xl:grid md:grid-cols-1 md:grid-rows-[auto_auto_auto_auto]",
          "md:row-start-1 md:col-start-2"
        )}
      />
    </div>
  );
};

export default function Thumbnails(props: {
  product: Product;
  className: string;
}) {
  const images = props.product.images.slice(0, 4);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <>
      <Image
        src={props.product.images[selectedIndex].url}
        blurDataURL={`${props.product.images[selectedIndex].url}?width=10`}
        alt={props.product.images[selectedIndex].altText}
        placeholder="blur"
        width={500}
        height={500}
        className={classNames(
          "w-full aspect-square object-cover",
          "sm:rounded-lg",
          "md:row-start-1 md:col-start-1"
        )}
        loading="lazy"
      />

      <div
        className={classNames(
          "px-8 row-start-3 grid grid-cols-4 grid-rows-1 gap-4",
          "sm:col-start-1 sm:row-start-3 sm:px-0",
          props.className
        )}
      >
        {images.map((image, index) => (
          <Image
            onClick={() => setSelectedIndex(index)}
            key={index}
            src={image.url}
            blurDataURL={`${image.url}?width=10`}
            alt={image.altText}
            width={500}
            height={500}
            placeholder="blur"
            className={classNames(
              "w-full aspect-square object-cover bg-natural-200 rounded cursor-pointer",
              {
                "outline outline-natural-700": index == selectedIndex,
              }
            )}
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
}
