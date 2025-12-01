"use client";

import { addToCart } from "@/utils/shopify/actions";
import { Product, ProductOptions } from "@/utils/types";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Quantity from "@/components/Quantity";

type Props = {
  product: Product;
};

export default function ProductForm({ product }: Props) {
  const quantityInput = useRef(null);
  const searchParams = useSearchParams();

  const colorOption = product.options.filter(
    (option) => option.name === "Color"
  )[0];
  const sizeOption = product.options.filter(
    (option) => option.name === "Size"
  )[0];

  const firstOption = useMemo(
    () => (option: ProductOptions) => {
      return option.optionValues[0].name;
    },
    [colorOption, sizeOption]
  );

  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") ?? firstOption(colorOption)
  );
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") ?? firstOption(sizeOption)
  );

  const router = useRouter();

  useEffect(() => {
    router.push(`?color=${selectedColor}&size=${selectedSize}`);
  }, [selectedColor, selectedSize]);

  const [state, formAction, pending] = useActionState(addToCart, {});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      action={formAction}
      className={classNames(
        "px-8 flex flex-col gap-4",
        "md:col-start-2 md:row-start-1 md:px-0",
        "xl:col-start-3"
      )}
    >
      {/* COLOR FIELD */}
      {colorOption && (
        <fieldset className="space-y-2">
          <legend className="text-base text-natural-700 font-bold">
            Select {colorOption.name}
          </legend>

          <div
            className={classNames("grid grid-cols-3 gap-1", "lg:grid-cols-4")}
          >
            {colorOption.optionValues.map((optionValue, index) => {
              const available =
                optionValue.firstSelectableVariant.availableForSale;

              return (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name="color"
                    value={optionValue.name}
                    checked={selectedColor === optionValue.name}
                    onChange={() => setSelectedColor(optionValue.name)}
                    required
                    className="peer hidden"
                    disabled={!available}
                  />
                  <span
                    className={classNames(
                      "block rounded py-3 text-center text-sm font-semibold cursor-pointer bg-primary-100 text-primary-500 peer-checked:bg-primary-400 peer-checked:text-natural-100 peer-checked:hover:bg-primary-500 peer-checked:hover:text-primary-100 hover:bg-primary-200 hover:text-primary-500",
                      { "opacity-50 cursor-not-allowed!": !available }
                    )}
                  >
                    {optionValue.name}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* SIZE FIELD */}
      {sizeOption && (
        <fieldset className="space-y-2">
          <legend className="text-base text-natural-700 font-bold">
            Select {sizeOption.name}
          </legend>

          <div
            className={classNames("grid grid-cols-3 gap-1", "lg:grid-cols-4")}
          >
            {sizeOption.optionValues.map((optionValue, index) => {
              const available =
                optionValue.firstSelectableVariant.availableForSale;

              return (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name="size"
                    value={optionValue.name}
                    checked={selectedSize === optionValue.name}
                    onChange={() => setSelectedSize(optionValue.name)}
                    required
                    className="peer hidden"
                    disabled={!available}
                  />
                  <span
                    className={classNames(
                      "block rounded py-3 text-center text-sm font-semibold cursor-pointer bg-primary-100 text-primary-500 peer-checked:bg-primary-400 peer-checked:text-natural-100 peer-checked:hover:bg-primary-500 peer-checked:hover:text-primary-100 hover:bg-primary-200 hover:text-primary-500",
                      { "opacity-50 cursor-not-allowed!": !available }
                    )}
                  >
                    {optionValue.name}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
      <div className={classNames("flex gap-2", "md:mt-auto")}>
        <Quantity ref={quantityInput} min={1} max={10} />
        <div className="flex flex-col size-full">
          <button
            type="submit"
            className={classNames(
              "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity",
              { "opacity-50 cursor-not-allowed!": pending }
            )}
            disabled={pending}
          >
            {pending ? "Adding to Cart..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </form>
  );
}
