"use client";

import { CartProduct } from "@/utils/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const CartOpenContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export const CartContext = createContext<
  | [
      { items: CartProduct[] } | undefined,
      Dispatch<SetStateAction<{ items: CartProduct[] }>>
    ]
  | null
>(null);

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<{ items: CartProduct[] }>({ items: [] });

  return (
    <CartContext value={[cart, setCart]}>
      <CartOpenContext value={[cartOpen, setCartOpen]}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CartOpenContext>
    </CartContext>
  );
}
