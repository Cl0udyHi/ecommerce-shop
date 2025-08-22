"use client";

import { ProductType } from "@/app/utils/types";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { Thumbnails } from "./components/ImagePreview";
import ColorInput from "./components/ColorInput";
import QuantityButton from "./components/QuantityButton";
import TestimonialsContainer from "@/app/Elements/Testimonials/Testimonials";

const ProductInfo = (props: { product: ProductType }) => {
  const Product = props.product;

  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

  return (
    <div className="flex flex-col gap-8 mb-16">
      <div
        className={classNames(
          "grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-8",
          "sm:px-16 sm:grid sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-4 sm:gap-y-8",
          "xl:grid-cols-3 xl:grid-rows-[auto_auto_auto]"
        )}
      >
        {/* Product Image */}
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

        {/* Thumbnails */}
        <Thumbnails
          product={Product}
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
          <h1 className="text-xl text-natural-700 font-bold">{Product.name}</h1>
          <div className="row-start-2 col-span-2 flex gap-1 items-center">
            <svg
              className="h-3 w-auto fill-natural-600"
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
              {Product.price}
            </h3>
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
            {Product.description}
          </p>
        </div>

        {/* Select Options */}
        <form
          className={classNames(
            "px-8 flex flex-col gap-4",
            "sm:col-start-2 sm:row-start-1 sm:px-0",
            "xl:col-start-3"
          )}
          action="/cart"
          method="post"
        >
          {/* Size selection */}
          <fieldset className="space-y-2">
            <legend className="text-base text-natural-700 font-bold">
              Select Color
            </legend>

            <div className="flex flex-wrap gap-1">
              {Product.colors.map((color, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    className="peer hidden"
                    required={true}
                  />
                  <ColorInput color={color} />
                </label>
              ))}
            </div>
          </fieldset>

          {/* Size selection */}
          <fieldset className="space-y-2">
            <legend className="text-base text-natural-700 font-bold">
              Select Size
            </legend>

            <div className="grid grid-cols-4 gap-1">
              {sizes.map((size, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    className="peer hidden"
                    required={true}
                  />
                  <span
                    className="block rounded py-3 text-center text-sm font-semibold cursor-pointer bg-primary-100 text-primary-500
                 peer-checked:bg-primary-400 peer-checked:text-natural-100
                 hover:bg-primary-200 hover:text-primary-500"
                  >
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Quantity + Add to Cart */}
          <div className={classNames("flex gap-2", "sm:mt-auto")}>
            <QuantityButton />
            <button
              type="submit"
              className="w-full py-2 bg-accent-300 text-natural-100 text-sm font-semibold rounded"
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

export default ProductInfo;
