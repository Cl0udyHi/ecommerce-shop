import React from "react";
import Link from "next/link";
import ProductInfo from "./ProductInfo";
import { Product } from "@/lib/shopify/types";
import { getProduct } from "@/lib/shopify";

const ProductId = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const productId = (await params).productId;
  const product: Product | undefined = await getProduct(productId);

  if (!product) return;

  return (
    <div className="min-h-screen">
      {ProductInfo ? <ProductInfo product={product} /> : <UndefinedProduct />}
    </div>
  );
};

const UndefinedProduct = () => {
  return (
    <>
      <h1>Sorry couldn't find what you're looking for</h1>
      <Link href={"/"}>Go Back</Link>
    </>
  );
};

export default ProductId;
