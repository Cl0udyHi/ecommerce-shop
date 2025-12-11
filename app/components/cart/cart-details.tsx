"use client";

import classNames from "classnames";

import CloseIcon from "@/public/icons/close.svg";
import { AnimatePresence } from "framer-motion";
import { Cart, CartLine } from "@/utils/types";
import { motion } from "framer-motion";
import ShoppingCartWarning from "@/public/icons/shopping_cart_warning.svg";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import DeleteIcon from "@/public/icons/delete.svg";
import SpinnerIcon from "@/public/icons/loading.svg";
import { useCartPanelOpenState } from "@/app/components/providers";
import { deleteItem, updateCartLineQuantity } from "@/app/actions/cart-actions";
import { useOnClickOutside } from "usehooks-ts";
import Quantity from "@/components/Quantity";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

export default function CartDetails({ cart }: { cart: Cart }) {
  const [isOpen, setIsOpen] = useCartPanelOpenState();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const { lines } = cart;

  return (
    <div
      ref={ref}
      className={classNames(
        "fixed top-0 right-0 bg-natural-100 h-full w-full z-100 flex flex-col px-8 transition-transform duration-150 drop-shadow-sm sm:w-[393px]",
        { "translate-x-full pointer-events-none": !isOpen }
      )}
    >
      <section className="flex justify-between items-center py-4">
        <h1 className="text-xl text-natural-700 font-bold">My Cart</h1>
        <button
          aria-label="Close"
          onClick={() => setIsOpen(false)}
          className={classNames(
            "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300"
          )}
        >
          <CloseIcon className="w-5 h-auto fill-natural-700" />
        </button>
      </section>

      <section
        className={classNames(
          "relative flex flex-col gap-4 overflow-y-scroll -mx-8 px-8 h-full scrollbar-invisible"
        )}
        style={{ scrollbarGutter: "stable" }}
      >
        <AnimatePresence>
          {lines.length > 0 ? (
            <>
              {lines.map((line, index) => (
                <motion.div
                  key={line.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <Product line={line} />
                </motion.div>
              ))}
            </>
          ) : (
            <EmptyCart />
          )}
        </AnimatePresence>
      </section>

      <section className="mt-auto flex flex-col gap-4 pb-8">
        <section>
          <section className="py-3 flex justify-between items-center border-b border-natural-300">
            <span className="text-base text-natural-700 font-normal">
              Total:
            </span>
            <span className="text-base text-natural-700 font-bold">
              {cart.cost.totalAmount.amount}
              {cart.cost.totalAmount.currencyCode}
            </span>
          </section>
        </section>

        <Link href={cart.checkoutUrl}>
          <button
            className={classNames(
              "w-full py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity",
              {
                "opacity-50 cursor-not-allowed!": lines.length < 1,
              }
            )}
            aria-disabled={lines.length < 1}
          >
            Checkout
          </button>
        </Link>
      </section>
    </div>
  );
}

function Product({ line }: { line: CartLine }) {
  const { merchandise, quantity, cost } = line;
  const { image, title, product, quantityAvailable } = merchandise;

  const [deleteLineState, deleteLineAction, deleteLinePending] = useActionState(
    deleteItem,
    null
  );
  const [
    updateLineQuantityState,
    updateLineQuantityAction,
    updateLineQuantityPending,
  ] = useActionState(updateCartLineQuantity, null);

  function handleQuantityChange(value: number) {
    const fd = new FormData();
    fd.set("quantity", value.toString());
    fd.set("lineId", line.id);

    startTransition(() => {
      updateLineQuantityAction(fd);
    });
  }

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded && (
        <div
          className={classNames(
            "w-full flex gap-3 scale-95 opacity-0 transition-all delay-150",
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
            className="w-full flex gap-3"
          >
            <Image
              src={image.url ?? ""}
              blurDataURL={`${image.url}?width=10`}
              alt={image.altText ?? ""}
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
                    {cost.totalAmount.amount}
                    {cost.totalAmount.currencyCode}
                  </span>
                  <span className="text-sm text-natural-600 font-normal">
                    {title}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Quantity
                  disabled={updateLineQuantityPending}
                  defaultValue={quantity}
                  name="quantity"
                  onChange={handleQuantityChange}
                  min={1}
                  max={quantityAvailable ?? 10}
                />
                <form>
                  <input type="hidden" name="lineId" value={line.id} />
                  <button
                    formAction={deleteLineAction}
                    aria-label="Delete"
                    aria-disabled={deleteLinePending}
                    className={classNames(
                      "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300",
                      { "bg-[#FF0000]": deleteLineState?.errors?.delete }
                    )}
                  >
                    {deleteLinePending ? (
                      <SpinnerIcon className="w-5 h-auto fill-natural-700 animate-spin" />
                    ) : (
                      <DeleteIcon className="w-5 h-auto fill-natural-700" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function EmptyCart() {
  return (
    <div className="absolute inset-0 m-auto w-full h-max shrink-0 flex flex-col justify-center items-center gap-4">
      <ShoppingCartWarning className="w-10 h-10 fill-natural-700" />
      <span>Your cart is empty :(</span>
    </div>
  );
}

export function CartSkeleton() {
  const [isOpen, setIsOpen] = useCartPanelOpenState();

  return (
    <div
      className={classNames(
        "sm:w-[393px] fixed top-0 right-0 bg-natural-100 h-full w-full z-100 flex flex-col px-8 transition-transform duration-150 drop-shadow-sm",
        { "translate-x-full pointer-events-none": !isOpen }
      )}
    >
      <section className="flex justify-between items-center py-4">
        <h1 className="text-xl text-natural-700 font-bold">My Cart</h1>
        <button
          aria-label="Close"
          onClick={() => setIsOpen(false)}
          className={
            "col-start-2 ml-auto w-max row-start-1 p-2 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300"
          }
        >
          <CloseIcon className="w-5 h-auto fill-natural-700" />
        </button>
      </section>

      <section
        className={
          "relative flex flex-col gap-4 overflow-y-scroll -mx-8 px-8 h-full scrollbar-invisible"
        }
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={"w-full flex gap-3"}>
            <div
              className={
                "animate-pulse min-w-[120px] aspect-square object-cover bg-natural-200 sm:rounded-lg"
              }
            />
            <div className="w-full flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <span className="animate-pulse h-6 w-full bg-natural-200 rounded-sm" />
                <div className="flex justify-between items-center">
                  <span className="animate-pulse h-5 w-2/4 rounded-sm bg-natural-200" />
                  <span className="animate-pulse h-5 w-1/3 bg-natural-200 rounded-sm" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="animate-pulse w-18.5 h-10 rounded bg-natural-200" />
                <div>
                  <div
                    className={
                      "animate-pulse size-10 col-start-2 ml-auto row-start-1 rounded-sm bg-natural-200"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-auto flex flex-col gap-4 pb-8">
        <section>
          <section className="py-3 flex justify-between items-center border-b border-natural-300">
            <span className="text-base text-natural-700 font-normal">
              Total:
            </span>
            <span className="animate-pulse h-6 w-1/4 rounded-sm bg-natural-200" />
          </section>
        </section>

        <div
          className={
            "w-full flex justify-center items-center py-2 bg-accent-300 hover:bg-accent-200 text-natural-100 text-sm font-semibold rounded transition-opacity"
          }
        >
          Checkout
        </div>
      </section>
    </div>
  );
}
