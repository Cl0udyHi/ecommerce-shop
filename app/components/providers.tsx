"use client";

import { CartItem, CartProduct } from "@/utils/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const CartPanelContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export const CartContext = createContext<
  [CartItem[], Dispatch<SetStateAction<CartItem[]>>] | null
>(null);

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext value={[cartItems, setCartItems]}>
      <CartPanelContext value={[cartOpen, setCartOpen]}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CartPanelContext>
    </CartContext>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartContext");
  }

  return context;
}

export function useCartPanel() {
  const context = useContext(CartPanelContext);
  if (!context) {
    throw new Error("useCartPanel must be used within CartPanelContext");
  }

  return context;
}
