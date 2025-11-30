"use client";

import { Product, ProductImage } from "@/utils/types";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductImages({ product }: Props) {
  const images = product.images.slice(0, 4);
  if (!images) return;

  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);

  return (
    <>
      <Image
        src={selectedImage.url}
        blurDataURL={`${selectedImage.url}&width=10`}
        alt={selectedImage.altText ?? ""}
        placeholder="blur"
        width={selectedImage.width}
        height={selectedImage.height}
        className={classNames(
          "w-full aspect-square object-cover select-none",
          "md:rounded-lg",
          "md:row-start-1 md:col-start-1"
        )}
        loading="lazy"
      />

      <div
        className={classNames(
          "px-8 row-start-3 grid grid-cols-4 grid-rows-1 gap-4",
          "md:col-start-1 md:row-start-3 md:px-0",
          "xl:col-start-2 xl:row-start-1 xl:grid-cols-2 xl:grid-rows-2"
        )}
      >
        {images.map((image, index) => (
          <Image
            onClick={() => setSelectedImage(image)}
            key={index}
            src={image.url}
            blurDataURL={`${image.url}&width=10`}
            alt={image.altText ?? ""}
            width={image.width}
            height={image.height}
            placeholder="blur"
            className={classNames(
              "w-full aspect-square object-cover bg-natural-200 rounded cursor-pointer select-none",
              {
                "outline outline-natural-700": image.id == selectedImage.id,
              }
            )}
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
}
