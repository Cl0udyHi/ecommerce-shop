"use client";

import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import TestimonialsContainer from "@/components/Testimonials";
import Image from "next/image";

import type { Product, ProductImage } from "@/utils/types";
import { CartContext, CartOpenContext } from "@/components/cart/cart-context";
import { useProduct } from "@/hooks/useProduct";

const ProductInfo = ({ productHandle }: { productHandle: string }) => {
  const { data: product, isLoading, error } = useProduct(productHandle);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error loading product<p>{error.message}</p>
      </div>
    );
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen flex flex-col gap-8 mb-16 mt-px">
      <div
        className={classNames(
          "grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-8",
          "sm:px-16 sm:grid sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-4 sm:gap-y-8",
          "xl:grid-cols-3 xl:grid-rows-[auto_auto_auto]"
        )}
      >
        {/* Images */}
        <Images
          product={product}
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
          <h1 className="text-2xl text-natural-700 font-bold">
            {product.title}
          </h1>
          <div className="row-start-2 col-span-2 flex gap-1 items-center">
            <span className="text-sm text-natural-600 font-medium">
              {product.priceRange.minVariantPrice.amount}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
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
          {product.description.length > 1 && (
            <>
              <h1 className="text-xl text-natural-700 font-bold">
                Product Details
              </h1>
              <p
                className="text-natural-700 font-normal [&_li]:indent-0 [&_li]:ml-4 [&_ul]:list-outside [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></p>
            </>
          )}
        </div>

        {/* Select Options */}
        <form
          className={classNames(
            "px-8 flex flex-col gap-4",
            "sm:col-start-2 sm:row-start-1 sm:px-0",
            "xl:col-start-3"
          )}
          method="get"
        >
          {/* {Colors.length > 0 && (
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
                      value={color}
                      className="peer hidden"
                      required={true}
                    />
                    <ColorInput color={color ?? ""} />
                  </label>
                ))}
              </div>
            </fieldset>
          )}

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
                        name={available ? "size" : ""}
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

          <div className={classNames("flex gap-2", "sm:mt-auto")}>
            <Quantity
              // value={quantity}
              // onChange={setQuantity}
              min={1}
              max={10}
            />
            <button
              type="submit"
              className={classNames(
                "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity"
                // ,{
                //   "opacity-50 cursor-not-allowed!": !canSubmit,
                // }
              )}
              // disabled={!canSubmit}
            >
              Add to Cart
            </button>
          </div> */}
          {product.options.map((option, index) => (
            <fieldset key={index} className="space-y-2">
              <legend className="text-base text-natural-700 font-bold">
                Select {option.name}
              </legend>

              <div className="grid grid-cols-4 gap-1">
                {option.optionValues.map((optionValue, index) => (
                  <label key={index} className="block">
                    <input
                      type="radio"
                      name={option.name}
                      value={optionValue.name}
                      defaultChecked={index == 0}
                      required
                      className="peer hidden"
                      // disabled={!available && true} //If not available return false (disable)
                    />
                    <span
                      className={classNames(
                        "block rounded py-3 text-center text-sm font-semibold cursor-pointer bg-primary-100 text-primary-500 peer-checked:bg-primary-400 peer-checked:text-natural-100 peer-checked:hover:bg-primary-500 peer-checked:hover:text-primary-100 hover:bg-primary-200 hover:text-primary-500"
                        // ,{ "opacity-50 cursor-not-allowed!": !available }
                      )}
                    >
                      {optionValue.name}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className={classNames("flex gap-2", "sm:mt-auto")}>
            {/* <Quantity
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
            /> */}
            <button
              type="submit"
              className={classNames(
                "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity"
                // ,{
                //   "opacity-50 cursor-not-allowed!": !canSubmit,
                // }
              )}
              // disabled={!canSubmit}
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

// const ColorInput = (props: { color: string }) => {
//   return (
//     <div
//       className="peer-checked:[&>svg]:block w-10 h-10 flex justify-center items-center bg-natural-200 border border-natural-700 rounded-full cursor-pointer"
//       style={{ backgroundColor: color }}
//     >
//       <CheckmarkIcon
//         className="hidden w-5 h-auto fill-natural-700"
//         style={{ fill: getContrastColor(color) }}
//       />
//     </div>
//   );
// };

function Images({
  product,
  className,
}: {
  product: Product;
  className: string;
}) {
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
          className
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
              "w-full aspect-square object-cover bg-natural-200 rounded cursor-pointer",
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

export default ProductInfo;
