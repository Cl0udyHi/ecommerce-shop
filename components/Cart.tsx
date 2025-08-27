"use client";

import classNames from "classnames";
import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import Quantity from "./Quantity";

import CloseIcon from "@/public/icons/close.svg";
import Bag from "@/public/icons/bag.svg";

import type { CartProduct } from "@/utils/types";
import type { Product } from "@/lib/shopify/types";
import { useOnClickOutside } from "usehooks-ts";
import { CartOpenContext } from "@/app/bodyContent";
import MyCart from "@/utils/Cart";

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const unsubscribe = MyCart.subscribe(setCartProducts);
    return unsubscribe; // cleanup  }, []);
  });

  const openContext = useContext(CartOpenContext);
  if (!openContext) {
    throw new Error("CartOpenContext is not available");
  }
  const [isOpen, setIsOpen] = openContext;

  const cartRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(cartRef as RefObject<HTMLElement>, () => setIsOpen(false));

  const productsSectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    productsSectionRef.current?.scrollTo({ top: 0 });
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-sm cursor-pointer bg-accent-500 hover:bg-accent-400"
      >
        <Bag className="w-5 h-auto fill-accent-100" />
      </button>

      <div
        ref={cartRef}
        className={classNames(
          "fixed top-0 right-0 bg-natural-100 h-screen w-full z-100 flex flex-col px-8 transition-transform duration-150 drop-shadow-sm",
          "sm:w-[393px]",
          { "translate-x-full pointer-events-none": !isOpen }
        )}
      >
        <section className="flex justify-between items-center py-4">
          <h1 className="text-xl text-natural-700 font-bold">My Cart</h1>
          <button
            onClick={() => setIsOpen(false)}
            className={classNames(
              "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300"
            )}
          >
            <CloseIcon className="w-5 h-auto fill-natural-700" />
          </button>
        </section>

        <section
          ref={productsSectionRef}
          className={classNames(
            "flex flex-col gap-4 overflow-y-scroll -mx-8 px-8"
          )}
          style={{ scrollbarGutter: "stable" }}
        >
          {cartProducts.map((cartProduct, index) => {
            return <Product key={index} cartProduct={cartProduct} />;
          })}
        </section>

        <section className="mt-auto flex flex-col gap-4 pb-8">
          <section>
            <section className="py-3 flex justify-between items-center border-b border-natural-300">
              <span className="text-base text-natural-700 font-normal">
                Taxes:
              </span>
              <span className="text-base text-natural-700 font-normal">
                0 SAR
              </span>
            </section>
            <section className="py-3 flex justify-between items-center border-b border-natural-300">
              <span className="text-base text-natural-700 font-normal">
                Total:
              </span>
              <span className="text-base text-natural-700 font-bold">
                0 SAR
              </span>
            </section>
          </section>
          <button
            onClick={() => MyCart.checkout()}
            className={classNames(
              "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity",
              {
                "opacity-50 cursor-not-allowed!": cartProducts.length < 1,
              }
            )}
            disabled={!(cartProducts.length < 1)}
          >
            Checkout
          </button>
        </section>
      </div>
    </>
  );
}

const Product = (props: { cartProduct: CartProduct }) => {
  const { variants, quantity, product } = props.cartProduct;

  return (
    <div className="flex gap-3">
      <Image
        src={product.images[0].url}
        blurDataURL={`${product.images[0].url}?width=10`}
        alt={product.images[0].altText}
        placeholder="blur"
        width={120}
        height={120}
        className={classNames(
          "min-w-[120px] aspect-square object-cover",
          "sm:rounded-lg"
        )}
        loading="lazy"
      />
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-base text-natural-700 font-bold">
            {product.title}
          </span>
          <div className="flex justify-between items-center">
            <span className="text-sm text-natural-700 font-semibold">
              {product.priceRange.minVariantPrice.amount}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </span>
            <span className="text-sm text-natural-600 font-normal">
              {variants.map((variant) => variant).join(" / ")}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Quantity />
          <button
            onClick={() => {
              MyCart.removeProduct(props.cartProduct);
            }}
            className={classNames(
              "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300"
            )}
          >
            <CloseIcon className="w-5 h-auto fill-natural-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
