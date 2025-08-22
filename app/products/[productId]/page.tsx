import React from "react";
import { collections } from "@/app/utils/data";
import type { ProductType } from "@/app/utils/types";
import Link from "next/link";
import ProductInfo from "./ProductInfo";

const ProductId = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const productId = (await params).productId;
  const Product: ProductType | null =
    collections
      .map((c) => c.products.find((p) => p.id === productId))
      .find((p) => p !== undefined) ?? null;

  return (
    <div className="min-h-screen">
      {Product ? <ProductInfo product={Product} /> : <UndefinedProduct />}
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
