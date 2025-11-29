"use server";

import { cookies } from "next/headers";

export async function createCart() {
  const Cookies = await cookies();
  let cartId = Cookies.get("cartId")?.value;

  if (!cartId) {
    Cookies.set("cartId", "hih");
  }

  return cartId;
}

export async function addToCart(previousState: any, formData: FormData) {
  try {
    const rawFormData = {
      color: formData.get("color") as string,
      size: formData.get("size") as string,
      quantity: formData.get("quantity") as string,
    };

    console.log(
      `submitted a form of: \ncolor: ${rawFormData.color}\nsize: ${rawFormData.size}\nquantity: ${rawFormData.quantity}`
    );
    return rawFormData;
  } catch (error) {
    return { ...previousState, error: error };
  }
}
