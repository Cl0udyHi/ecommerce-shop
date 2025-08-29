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

import Quantity from "../Quantity";

import CloseIcon from "@/public/icons/close.svg";
import ShoppingCartWarning from "@/public/icons/shopping_cart_warning.svg";

import type { CartProduct } from "@/utils/types";
import type { Product } from "@/lib/shopify/types";
import { useOnClickOutside } from "usehooks-ts";
import { CartOpenContext } from "@/components/cart/cart-context";
import MyCart from "@/utils/Cart";

import { motion, AnimatePresence } from "framer-motion";

export default function ShoppingCart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = MyCart.subscribe((products) => {
      setCartProducts(products);
      setTotalPrice(MyCart.getTotal());
    });
    return unsubscribe; // cleanup  }, []);
  });

  useEffect(() => {
    const handlePopState = () => {
      setIsOpen(false);
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        setIsOpen(false);
        window.history.pushState(null, "", window.location.href);
      }
    };

    if (isOpen) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

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
            {cartProducts.length > 0 ? (
              cartProducts.map((cartProduct) => {
                return (
                  <motion.div
                    key={cartProduct.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Product key={cartProduct.id} cartProduct={cartProduct} />
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
              "opacity-50 cursor-not-allowed!": cartProducts.length < 1,
            }
          )}
          disabled={!(cartProducts.length < 1)}
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

const Product = (props: { cartProduct: CartProduct }) => {
  const { variants, product } = props.cartProduct;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  function handleRemove() {
    MyCart.removeProduct(props.cartProduct);
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
                {variants.filter(Boolean).join(" / ")}
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
