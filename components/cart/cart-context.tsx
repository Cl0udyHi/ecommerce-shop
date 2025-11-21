"use client";

import { CartProduct } from "@/utils/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export const CartOpenContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export const CartContext = createContext<
  | [
      { items: CartProduct[] } | undefined,
      Dispatch<SetStateAction<{ items: CartProduct[] }>>,
    ]
  | null
>(null);

const BodyContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<{ items: CartProduct[] }>({ items: [] });

  return (
    <CartContext value={[cart, setCart]}>
      <CartOpenContext value={[cartOpen, setCartOpen]}>
        {children}
      </CartOpenContext>
    </CartContext>
  );
};

export default BodyContent;
