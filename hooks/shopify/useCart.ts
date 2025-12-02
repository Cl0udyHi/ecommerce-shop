import { shopifyFetch } from "@/utils/shopify/shopify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function fetchCartId() {
  const query = `
      mutation createCart {
          cartCreate {
              cart {
                  id
              }
          }
      }
  `;

  const data = await shopifyFetch<any>(query);

  return data.data.cartCreate.cart.id;
}

export async function fetchCartLines() {}

export function useCreateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCartId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
