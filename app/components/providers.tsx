"use client";

import { CartLine } from "@/utils/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";

export const CartPanelOpenStateContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  const [cartOpen, setCartOpen] = useState<boolean>(false);

  return (
    <CartPanelOpenStateContext value={[cartOpen, setCartOpen]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CartPanelOpenStateContext>
  );
}

export function useCartPanelOpenState() {
  const context = useContext(CartPanelOpenStateContext);
  if (!context) {
    throw new Error(
      "useCartPanelOpenState must be used within CartPanelContext"
    );
  }

  return context;
}
