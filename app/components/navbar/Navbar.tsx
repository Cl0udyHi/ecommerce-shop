import { getCart } from "@/lib/shopify/api";
import NavbarDetails from "./navbar-details";

export default async function Navbar() {
  const cart = await getCart();

  return <NavbarDetails cart={cart} />;
}
