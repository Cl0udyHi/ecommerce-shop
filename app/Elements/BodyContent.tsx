"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import Cart from "@/components/Cart";

export const CartOpenContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

const BodyContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  return (
    <CartOpenContext value={[cartOpen, setCartOpen]}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Cart />
    </CartOpenContext>
  );
};

export default BodyContent;
