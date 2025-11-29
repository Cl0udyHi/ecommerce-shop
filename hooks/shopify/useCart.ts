import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export async function createCart() {
  const query = `
      mutation createCart {
          cartCreate {
              cart {
                  id
              }
          }
      }
  `;

  const { data } = await axios.post("/api/shopify", { query });
  return data.data.cartCreate.cart.id as string;
}

export function useCreateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
