"use client";

import { Cart, CartLine, Product } from "@/utils/types";
import classNames from "classnames";
import { useActionState, useState } from "react";
// import Quantity from "@/components/Quantity";
import { useCartPanelOpenState } from "@/app/components/providers";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/utils/data";
import { addCartLine } from "@/app/actions/cart-actions";
import AddIcon from "@/public/icons/add.svg";
import RemoveIcon from "@/public/icons/remove.svg";

export default function ProductForm({
  product,
  cart,
}: {
  product: Product;
  cart: Cart;
}) {
  const [open, setOpen] = useCartPanelOpenState();
  const [state, action, pending] = useActionState(addCartLine, null);

  async function serverAction(formData: FormData) {
    const variant = product.variants.find((variant) => {
      return variant.selectedOptions.every((selectedOption) => {
        const formValue = formData.get(selectedOption.name);
        return formValue === selectedOption.value;
      });
    });

    formData.set("variantId", variant.id);

    action(formData);
  }

  return (
    <form
      action={serverAction}
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
              return (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={option.name}
                    value={optionValue.name}
                    defaultChecked={
                      state?.inputs
                        ? state.inputs[option.name] == optionValue.name
                        : index == 0
                    }
                    required
                    className="peer hidden"
                  />
                  <span
                    className={classNames(
                      "block rounded py-3 text-center text-sm font-semibold cursor-pointer bg-primary-100 text-primary-500 peer-checked:bg-primary-400 peer-checked:text-natural-100 peer-checked:hover:bg-primary-500 peer-checked:hover:text-primary-100 hover:bg-primary-200 hover:text-primary-500"
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
        <Quantity defaultValue={1} />
        <div className="flex flex-col size-full">
          <button
            type="submit"
            className={classNames(
              "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity",
              { "opacity-50 cursor-not-allowed!": pending }
            )}
            disabled={pending}
          >
            {pending ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Quantity({ defaultValue = 1 }: { defaultValue: number }) {
  const [value, setValue] = useState(defaultValue);

  const handleIncrease = () => {
    setValue((prev) => Math.min(MAX_QUANTITY, prev + 1));
  };

  const handleDecrease = () => {
    setValue((prev) => Math.max(MIN_QUANTITY, prev - 1));
  };

  return (
    <div className="w-fit flex items-center bg-natural-200 p-2 rounded">
      <button aria-label="Minus" type="button" onClick={handleDecrease}>
        <RemoveIcon className="w-5 aspect-square fill-natural-700" />
      </button>
      <span className="flex w-5 justify-center items-center aspect-square">
        {value}
        <input
          type="number"
          hidden
          name="quantity"
          onChange={() => {}}
          value={value}
          required
        />
      </span>
      <button aria-label="Plus" type="button" onClick={handleIncrease}>
        <AddIcon className="w-5 aspect-square fill-natural-700" />
      </button>
    </div>
  );
}
