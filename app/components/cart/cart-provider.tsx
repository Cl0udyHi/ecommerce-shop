import { getCart } from "@/lib/shopify/api";
import { Cart } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useCart() {
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    async function getCartId() {
      const id = await fetch("/api/cart").then((res) => res.json());
      setCartId(id);
    }

    getCartId();
  }, []);

  return useQuery<Cart>({
    queryKey: ["cart", cartId],
    queryFn: () => {
      return getCart(cartId);
    },
  });
}
