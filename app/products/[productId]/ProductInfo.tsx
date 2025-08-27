"use client";

import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import CheckmarkIcon from "@/public/icons/checkmark.svg";
import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";
import TestimonialsContainer from "@/app/Elements/Testimonials/Testimonials";
import { Product } from "@/lib/shopify/types";
import { getContrastColor } from "@/utils/color";
import Image from "next/image";

const ProductInfo = (props: { product: Product }) => {
  const Sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const Colors = Array.from(
    new Set(
      props.product.variants
        .map(
          (variant) =>
            variant.selectedOptions.find((opt) => opt.name === "Color")?.value
        )
        .filter(Boolean)
        .map((c) => c?.trim().toLowerCase())
    )
  );

  const AvailableSizes = props.product.variants
    .map(
      (variant) =>
        variant.selectedOptions.find((opt) => opt.name === "Size")?.value
    )
    .filter(Boolean);

  console.log(Colors);

  const formRef = useRef<HTMLFormElement | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  function handleFormChange() {
    const form = formRef.current;
    if (!form) return;

    setCanSubmit(form.checkValidity());
  }

  useEffect(() => {
    handleFormChange();
  }, []);

  return (
    <div className="flex flex-col gap-8 mb-16 mt-[1px]">
      <div
        className={classNames(
          "grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-8",
          "sm:px-16 sm:grid sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-4 sm:gap-y-8",
          "xl:grid-cols-3 xl:grid-rows-[auto_auto_auto]"
        )}
      >
        {/* Images */}
        <Images
          product={props.product}
          className={classNames(
            "xl:col-start-2 xl:row-start-1 xl:grid-cols-2 xl:grid-rows-2"
          )}
        />

        {/* Name / Price */}
        <div
          className={classNames(
            "row-start-2 px-8 flex flex-col gap-1",
            "sm:col-span-2 sm:row-start-2 sm:px-0"
          )}
        >
          <h1 className="text-xl text-natural-700 font-bold">
            {props.product.title}
          </h1>
          <div className="row-start-2 col-span-2 flex gap-1 items-center">
            <span className="text-sm text-natural-600 font-medium">
              {props.product.priceRange.minVariantPrice.amount}{" "}
              {props.product.priceRange.minVariantPrice.currencyCode}
            </span>
          </div>
        </div>

        {/* Description */}
        <div
          className={classNames(
            "row-start-4 px-8 flex flex-col gap-2",
            "sm:col-span-2 sm:row-start-4 sm:px-0",
            "xl:row-start-3"
          )}
        >
          <h1 className="text-base text-natural-700 font-bold">
            Product Details
          </h1>
          <p className="text-sm text-natural-700 font-normal">
            {props.product.description}
          </p>
        </div>

        {/* Select Options */}
        <form
          ref={formRef}
          onChange={handleFormChange}
          className={classNames(
            "px-8 flex flex-col gap-4",
            "sm:col-start-2 sm:row-start-1 sm:px-0",
            "xl:col-start-3"
          )}
          action="/cart"
          method="post"
        >
          {/* Color selection */}
          {Colors.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="text-base text-natural-700 font-bold">
                Select Color
              </legend>

              <div className="flex flex-wrap gap-1">
                {Colors.map((color, index) => (
                  <label key={index} className="block">
                    <input
                      type="radio"
                      name="color"
                      value={`${index}:${color}`}
                      className="peer hidden"
                      required={true}
                    />
                    <ColorInput color={color ?? ""} />
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Size selection */}
          {AvailableSizes.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="text-base text-natural-700 font-bold">
                Select Size
              </legend>

              <div className="grid grid-cols-4 gap-1">
                {Sizes.map((size, index) => {
                  const available = AvailableSizes.includes(size);

                  return (
                    <label key={index} className="block">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        className="peer hidden"
                        required={true}
                        disabled={!available && true} //If not available return false (disable)
                      />
                      <span
                        className={classNames(
                          "block rounded py-3 text-center text-sm font-semibold cursor-pointer bg-primary-100 text-primary-500 peer-checked:bg-primary-400 peer-checked:text-natural-100 hover:bg-primary-200 hover:text-primary-500",
                          { "opacity-50 cursor-not-allowed!": !available }
                        )}
                      >
                        {size}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Quantity + Add to Cart */}
          <div className={classNames("flex gap-2", "sm:mt-auto")}>
            <QuantityButton />
            <button
              type="submit"
              className={classNames(
                "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity",
                {
                  "opacity-50 cursor-not-allowed!": !canSubmit,
                }
              )}
              disabled={!canSubmit}
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>

      <TestimonialsContainer className="sm:px-16 px-8" />
    </div>
  );
};

function QuantityButton() {
  const [quantity, setQuantity] = useState(1);

  const Increase = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const Decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <button type="button" onClick={Decrease}>
        <RemoveIcon className="w-6 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-6 justify-center items-center aspect-square">
        {quantity}
      </span>
      <button type="button" onClick={Increase}>
        <AddIcon className="w-6 aspect-square fill-natural-700" />
      </button>
    </div>
  );
}

const ColorInput = (props: { color: string }) => {
  return (
    <div
      className="peer-checked:[&>svg]:block w-10 h-10 flex justify-center items-center bg-natural-200 border border-natural-700 rounded-full cursor-pointer"
      style={{ backgroundColor: props.color }}
    >
      <CheckmarkIcon
        className="hidden w-5 h-auto fill-natural-700"
        style={{ fill: getContrastColor(props.color) }}
      />
    </div>
  );
};

function Images(props: { product: Product; className: string }) {
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

export default ProductInfo;
