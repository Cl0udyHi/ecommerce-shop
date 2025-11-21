import Link from "next/link";
import ProductInfo from "./ProductInfo";

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { productId } = await params;
//   const { data: product, isPending, error } = useProduct(productId);

//   if (product)
//     return {
//       title: `${product.title} | Wavin`,
//     };

//   return {
//     title: "Product not found | Wavin",
//   };
// }

export default async function ProductId({
  params,
}: {
  params: Promise<{ productHandle: string }>;
}) {
  const { productHandle } = await params;

  return <ProductInfo productHandle={productHandle} />;
}

const UndefinedProduct = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1>Sorry couldn't find what you're looking for</h1>
      <Link href={"/"}>Go Back</Link>
    </div>
  );
};
