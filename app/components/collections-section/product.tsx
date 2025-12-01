import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import type { Product } from "@/utils/types";

const Product = (props: { product: Product }) => {
  return (
    <Link
      className={classNames(
        "basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] 2xl:basis-[calc((100%-3rem)/4)]",
        "flex flex-col shrink-0 gap-4 snap-always snap-start"
      )}
      href={"/product/" + props.product.handle}
    >
      {/* Image */}
      <Image
        src={props.product.featuredImage.url}
        blurDataURL={`${props.product.featuredImage.url}&width=10`}
        alt={props.product.featuredImage.altText ?? ""}
        width={props.product.featuredImage.width}
        height={props.product.featuredImage.height}
        placeholder="blur"
        className="object-cover w-full aspect-201/230 rounded-lg"
      />

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h2 className="sm:row-start-1 row-start-2 col-start-1 text-base font-bold group-hover:underline">
          {props.product.title}
        </h2>

        <span className="text-sm text-natural-600 font-medium">
          {props.product.priceRange.minVariantPrice.amount}{" "}
          {props.product.priceRange.minVariantPrice.currencyCode}
        </span>
      </div>
    </Link>
  );
};

export default Product;
