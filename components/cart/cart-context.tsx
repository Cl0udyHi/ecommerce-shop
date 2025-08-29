"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

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
      {children}
    </CartOpenContext>
  );
};

export default BodyContent;
