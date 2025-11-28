"use client";

import classNames from "classnames";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

import CloseIcon from "@/public/icons/close.svg";
import ShoppingCartWarning from "@/public/icons/shopping_cart_warning.svg";

// import type { CartItem, Product } from "@/lib/shopify/types";
import { useOnClickOutside } from "usehooks-ts";
import { CartContext, CartOpenContext } from "@/components/cart/cart-context";
import MyCart from "@/utils/Cart";

import { motion, AnimatePresence } from "framer-motion";
import { CartProduct } from "@/utils/types";
import Quantity from "../quantity";
import { useCreateCart } from "@/hooks/shopify/useCart";

export default function ShoppingCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("sad");
  const [cart, setCart] = cartContext;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { mutateAsync: createCartMutation } = useCreateCart();

  useEffect(() => {
    createCartMutation();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setIsOpen(false);
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
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
    if (!isOpen) return;

    window.history.pushState({ cartOpen: true }, "", window.location.href);

    const handlePopState = () => {
      if (isOpen) {
        setIsOpen(false);

        window.history.pushState({ cartOpen: true }, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  return (
    <div
      ref={cartRef}
      className={classNames(
        "fixed top-0 right-0 bg-natural-100 h-full w-full z-100 flex flex-col px-8 transition-transform duration-150 drop-shadow-sm",
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

      {
        <section
          ref={productsSectionRef}
          className={classNames(
            "relative flex flex-col gap-4 overflow-y-scroll -mx-8 px-8 h-full scrollbar-invisible"
          )}
          style={{ scrollbarGutter: "stable" }}
        >
          <AnimatePresence>
            {cart?.items && cart.items.length > 0 ? (
              cart.items.map((cartProduct) => {
                return (
                  <motion.div
                    key={cartProduct.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Product key={cartProduct.id} cartItem={cartProduct} />
                  </motion.div>
                );
              })
            ) : (
              <EmptyCart />
            )}
          </AnimatePresence>
        </section>
      }

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
              {totalPrice}
            </span>
          </section>
        </section>
        <button
          onClick={() => MyCart.checkout()}
          className={classNames(
            "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity",
            {
              "opacity-50 cursor-not-allowed!":
                cart?.items && cart?.items.length < 1,
            }
          )}
          disabled={!(cart?.items && cart.items.length < 1)}
        >
          Checkout
        </button>
      </section>
    </div>
  );
}

const EmptyCart = () => {
  return (
    <div className="absolute inset-0 m-auto w-full h-max shrink-0 flex flex-col justify-center items-center gap-4">
      <ShoppingCartWarning className="w-10 h-10 fill-natural-700" />
      <span>Your cart is empty :(</span>
    </div>
  );
};

const Product = ({ cartItem }: { cartItem: CartProduct }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("sad");
  const [cart, setCart] = cartContext;

  const product = cartItem.product;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  function handleRemove() {
    setCart((prev) => {
      prev?.items.filter((line) => line.id !== cartItem.id);

      return prev;
    });
  }

  return (
    <div
      className={classNames(
        "flex gap-3 scale-95 opacity-0 transition-all delay-150",
        {
          "scale-100 opacity-100": loaded,
        }
      )}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="flex gap-3"
      >
        <Image
          src={product.featuredImage.url}
          blurDataURL={`${product.featuredImage.url}?width=10`}
          alt={product.featuredImage.altText}
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
                {cartItem.variants.filter(Boolean).join(" / ")}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Quantity />
            <button
              onClick={handleRemove}
              className={classNames(
                "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300"
              )}
            >
              <CloseIcon className="w-5 h-auto fill-natural-700" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
