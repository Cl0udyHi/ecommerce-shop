import ProductInfo from "./components/product-info";

export default async function Product({
  params,
}: {
  params: Promise<{ productHandle: string; color: string; size: string }>;
}) {
  const { productHandle } = await params;

  return (
    <main className="min-h-screen flex flex-col gap-8 mb-16 mt-px">
      <ProductInfo productHandle={productHandle} />
    </main>
  );
}
