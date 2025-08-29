import React from "react";
import Link from "next/link";
import ProductInfo from "./ProductInfo";
import { Product } from "@/lib/shopify/types";
import { getProduct } from "@/lib/shopify";
import { Metadata } from "next";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product: Product | undefined = await getProduct(productId);

  if (product)
    return {
      title: `${product.title} | Wavin`,
    };

  return {
    title: "Product not found | Wavin",
  };
}

export default async function ProductId({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product: Product | undefined = await getProduct(productId);

  if (!product) return <UndefinedProduct />;

  return <ProductInfo product={product} />;
}

const UndefinedProduct = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1>Sorry couldn't find what you're looking for</h1>
      <Link href={"/"}>Go Back</Link>
    </div>
  );
};
