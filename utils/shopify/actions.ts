"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCart() {
  const Cookies = await cookies();
  let cartId = Cookies.get("cartId")?.value;

  if (!cartId) {
    Cookies.set("cartId", "hih");
  }

  return cartId;
}

export async function addToCart(previousState: any, formData: FormData) {
  "use server";

  try {
    const rawFormData = {
      color: formData.get("color") as string,
      size: formData.get("size") as string,
      quantity: formData.get("quantity") as string,
    };

    console.log("\x1b[30m\x1b[47m%s\x1b[0m", " Added to Cart: ");
    console.log(
      `submitted a form of: \ncolor: ${rawFormData.color}\nsize: ${rawFormData.size}\nquantity: ${rawFormData.quantity}`
    );

    redirect("/");

    return rawFormData;
  } catch (error) {
    return { ...previousState, error: error };
  }
}
