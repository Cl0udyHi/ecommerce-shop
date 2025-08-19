import { StaticImageData } from "next/image";

export type ScrollDirection = "LEFT" | "RIGHT";

export type TestimonialType = {
  name: string;
  text: string;
  rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
};

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
  image: StaticImageData | string;
  colors: CssColor[];
  id: number;
};

export type Collections = {
  name: string;
  products: Product[];
}[];
