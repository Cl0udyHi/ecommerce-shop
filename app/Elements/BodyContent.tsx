"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
<<<<<<< HEAD
import Cart from "@/components/Cart";
=======
>>>>>>> 2b7ecd870a1def2eeb00475b39f2882eeb2e7319

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
