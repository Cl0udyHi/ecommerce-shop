import Quantity from "@/components/quantity";
import { Product } from "@/utils/types";
import classNames from "classnames";
import { FormEvent } from "react";

type Props = {
  product: Product;
};

export default function ProductForm({ product }: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/shopify/cart", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return (
    <form
      method="post"
      action="/api/shopify/cart"
      onSubmit={(e) => handleSubmit(e)}
      className={classNames(
        "px-8 flex flex-col gap-4",
        "md:col-start-2 md:row-start-1 md:px-0",
        "xl:col-start-3"
      )}
    >
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
                    disabled={!available} //If not available return false (disable)
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
        <Quantity min={1} max={10} />
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
  );
}
