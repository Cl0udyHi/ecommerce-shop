"use client";

import { addToCart } from "@/utils/shopify/actions";
import { CartItem, Product, ProductOptions } from "@/utils/types";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useActionState, useRef, useState } from "react";
import Quantity from "@/components/Quantity";
import { useCart, useCartPanel } from "@/app/components/providers";
import { v4 as uuid } from "uuid";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/utils/data";

type Props = {
  product: Product;
};

export default function ProductForm({ product }: Props) {
  const quantityInput = useRef(null);
  const searchParams = useSearchParams();

  const router = useRouter();

  const [state, formAction, pending] = useActionState(addToCart, {});
  const [open, setOpen] = useCartPanel();
  const [cart, setCart] = useCart();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const color = formData.get("Color");
    const size = formData.get("Size");
    const quantity = Number(formData.get("quantity"));

    const variantId = product.variants.filter(
      (variant) =>
        variant.selectedOptions.filter((option) => option.name == "Color")[0]
          .value == color &&
        variant.selectedOptions.filter((option) => option.name == "Size")[0]
          .value == size
    )[0]?.id;

    if (cart.find((item) => item.variantId === variantId)) {
      const quantityLimit = (quantity: number) => {
        return Math.min(Math.max(quantity, MIN_QUANTITY), MAX_QUANTITY);
      };

      setCart((prev) =>
        prev.map((item) =>
          item.variantId === variantId
            ? {
                ...item,
                quantity: quantityLimit(item.quantity + quantity),
              }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: uuid(),
        product: product,
        quantity: quantity,
        variantId: variantId,
      };

      setCart((prev) => {
        return [...prev, newItem];
      });
    }

    setOpen(true);
  }

  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const color = formData.get("Color");
  //   const size = formData.get("Size");

  //   const variantId = product.variants.filter(
  //     (variant) =>
  //       variant.selectedOptions.filter((option) => option.name == "Color")[0]
  //         .value == color &&
  //       variant.selectedOptions.filter((option) => option.name == "Size")[0]
  //         .value == size
  //   )[0]?.id;

  //   formData.append("variantId", variantId);

  //   startTransition(() => {
  //     formAction(formData);
  //   });
  // }

  const [value, setValue] = useState<number>(1);

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
      {product.options.map((option, index) => (
        <fieldset key={index} className="space-y-2">
          <legend className="text-base text-natural-700 font-bold">
            Select {option.name}
          </legend>

          <div
            className={classNames("grid grid-cols-3 gap-1", "lg:grid-cols-4")}
          >
            {option.optionValues.map((optionValue, index) => {
              const available =
                optionValue.firstSelectableVariant.availableForSale;

              return (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={option.name}
                    value={optionValue.name}
                    defaultChecked={index == 0}
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
      ))}

      <div className={classNames("flex gap-2", "md:mt-auto")}>
        <Quantity
          ref={quantityInput}
          min={1}
          max={10}
          value={value}
          setValue={setValue}
        />
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
