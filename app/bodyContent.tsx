"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import Footer from "./Elements/Footer";
import Navbar from "./Elements/Navbar/Navbar";

export const CartOpenContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

const bodyContent = ({
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
    </CartOpenContext>
  );
};

export default bodyContent;
