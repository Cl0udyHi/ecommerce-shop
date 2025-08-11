import Hoodie1 from "@/public/images/products/hoodie_1.png";
import Hoodie2 from "@/public/images/products/hoodie_2.png";
import Hoodie3 from "@/public/images/products/hoodie_3.png";
import { StaticImageData } from "next/image";

export type CssColor =
  | "black"
  | "white"
  | "red"
  | "blue"
  | "green"
  | "gray"
  | "orange"
  | "pink"
  | "purple"
  | "yellow"
  | "brown"
  | "cyan"
  | "magenta";

export type Product = {
  name: string;
  price: string;
  image: StaticImageData;
  colors: CssColor[];
  id: number;
};

export type Collections = {
  name: string;
  products: Product[];
}[];

export const collections: Collections = [
  {
    name: "Winter Drop",
    products: [
      {
        id: 1,
        name: "WAVIN Oversized Tee",
        price: "129.00 SAR",
        image: Hoodie1,
        colors: ["black", "gray", "white"],
      },
      {
        id: 2,
        name: "WAVIN Cargo Shorts",
        price: "179.00 SAR",
        image: Hoodie2,
        colors: ["black", "white"],
      },
      {
        id: 3,
        name: "WAVIN Lightweight Shirt",
        price: "159.00 SAR",
        image: Hoodie3,
        colors: ["black", "gray", "white", "magenta"],
      },
    ],
  },
];

export const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/about" },
];
