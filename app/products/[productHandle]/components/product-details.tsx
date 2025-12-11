import classNames from "classnames";
import ProductImages from "./product-images";
import ProductForm from "./product-form";
import { getCart, getProduct } from "@/lib/shopify/api";
import { ProductError } from "./product-fallback";
import { TEMP_CARTID } from "@/utils/data";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productHandle: string; color: string; size: string }>;
}) {
  const { productHandle } = await params;
  const product = await getProduct(productHandle);
  const cart = await getCart(TEMP_CARTID);

  if (!product) {
    return (
      <ProductError message="Sorry, Couldn't find the product you're looking for." />
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 mb-16 mt-px">
      <div
        className={classNames(
          "grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-8",
          "md:px-16 md:grid md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto] md:gap-x-4 md:gap-y-8",
          "xl:grid-cols-3 xl:grid-rows-[auto_auto_auto]"
        )}
      >
        {/* Images */}
        <ProductImages product={product} />

        {/* Name / Price */}
        <div
          className={classNames(
            "row-start-2 px-8 flex flex-col gap-1",
            "md:col-span-2 md:row-start-2 md:px-0"
          )}
        >
          <h1 className="text-2xl text-natural-700 font-bold">
            {product.title}
          </h1>
          <div className="row-start-2 col-span-2 flex gap-1 items-center">
            <span className="text-sm text-natural-600 font-medium">
              {product.priceRange.minVariantPrice.amount}
              {product.priceRange.minVariantPrice.currencyCode}
            </span>
          </div>
        </div>

        {/* Description */}
        <div
          className={classNames(
            "row-start-4 px-8 flex flex-col gap-2",
            "md:col-span-2 md:row-start-4 md:px-0",
            "xl:row-start-3"
          )}
        >
          <h1 className="text-xl text-natural-700 font-bold">
            Product Details
          </h1>
          {product.description.length > 0 ? (
            <div
              className="text-natural-700 font-normal [&_li]:indent-0 [&_li]:ml-4 [&_ul]:list-outside [&_ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            ></div>
          ) : (
            <p className="text-natural-500">No Description Provided</p>
          )}
        </div>

        {/* Select Options */}
        <ProductForm product={product} cart={cart} />
      </div>
    </div>
  );
}
