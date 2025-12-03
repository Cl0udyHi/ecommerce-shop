import ProductInfo from "./components/product-info";
import { Suspense } from "react";
import { ProductSkeleton } from "./components/product-fallback";

export default async function Product({
  params,
}: {
  params: Promise<{ productHandle: string; color: string; size: string }>;
}) {
  return (
    <main className="min-h-screen flex flex-col gap-8 mb-16 mt-px">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductInfo params={params} />
      </Suspense>
    </main>
  );
}
