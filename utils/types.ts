// import { Product } from "@/lib/shopify/types";
import { StaticImageData } from "next/image";

export type AnyObject = Record<string, any>;

export type ProductImage = {
  id: string;
  altText: string;
  height: number;
  width: number;
  url: string;
};

export type ProductPrice = {
  amount: string;
  currencyCode: string;
};

export type ProductSelectedOption = { name: string; value: string };

export type ProductOptionValue = {
  id: string;
  name: string;
  firstSelectableVariant: {
    availableForSale: boolean;
    quantityAvailable: bigint;
    selectedOptions: ProductSelectedOption[];
  };
};

export type ProductOptions = {
  id: string;
  name: string;
  optionValues: ProductOptionValue[];
};

export type ProductVariant = {
  id: string;
  title: string;
  image: ProductImage;
  selectedOptions: ProductSelectedOption[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ProductImage;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  };
  options: ProductOptions[];
  variants: ProductVariant[];
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  products: Product[];
};

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

export type ScrollDirection = "LEFT" | "RIGHT" | "NONE";

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

export type CartItem = {
  id: string;
  variantId: string;
  product: Product;
  quantity: number;
};
