import { Product } from "@/lib/shopify/types";
import { StaticImageData } from "next/image";

export type CartProduct = {
  product: Product;
  id: string;
  variants: string[];
  quantity: number;
};

export type SocialMediaType = {
  name: string;
  href: string;
};

export type ScrollDirection = "LEFT" | "RIGHT";

export type TestimonialType = {
  name: string;
  text: string;
  rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: StaticImageData | string;
  colors: string[];
};

export type Collections = {
  id: string;
  name: string;
  products: ProductType[];
}[];
