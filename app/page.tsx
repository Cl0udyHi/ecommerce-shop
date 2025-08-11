import heroBanner from "@/public/images/Banner.png";
import Product from "./components/Product";
import Image, { StaticImageData } from "next/image";
import Testomonials from "./Testimonials";

import Hoodie1 from "@/public/images/products/hoodie_1.png";
import Hoodie2 from "@/public/images/products/hoodie_2.png";
import Hoodie3 from "@/public/images/products/hoodie_3.png";

type CssColor =
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

type Product = {
  name: string;
  price: string;
  image: StaticImageData;
  colors: CssColor[];
  id: number;
};

type Collections = {
  name: string;
  products: Product[];
}[];

const collections: Collections = [
  {
    name: "Winter Drop",
    products: [
      {
        id: 1,
        name: "WAVIN Oversized Tee",
        price: "129.00 SAR",
        image: Hoodie1,
        colors: ["black", "gray", "white"],
      },
      {
        id: 2,
        name: "WAVIN Cargo Shorts",
        price: "179.00 SAR",
        image: Hoodie2,
        colors: ["black", "white"],
      },
      {
        id: 3,
        name: "WAVIN Lightweight Shirt",
        price: "159.00 SAR",
        image: Hoodie3,
        colors: ["black", "gray", "white", "magenta"],
      },
    ],
  },
];

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/about" },
];

export default function Home() {
  return (
    <div className="sm:px-16 flex flex-col gap-8 py-8 px-8">
      <div className="mb-16" id="Home">
        <Image
          className="w-full rounded-lg"
          src={heroBanner}
          placeholder="blur"
          alt="Banner"
        />
      </div>
      <div id="Products" className="flex flex-col gap-8 w-full bg-natural-200">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 text-text text-xl font-bold"
          >
            <h1 className="font-bold text-[1.75rem]">{collection.name}</h1>
            <div className="md:grid-cols-3 grid grid-cols-2 gap-x-4 gap-y-8">
              {collection.products.map((product, index) => (
                <Product
                  name={product.name}
                  id={product.id}
                  price={product.price}
                  key={index}
                  colors={product.colors}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Testomonials />
    </div>
  );
}

export { collections, links };
