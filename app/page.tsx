import heroBanner from "@/public/images/Banner.png";
import Product from "./components/Product";
import Image from "next/image";
import Testomonials from "./Testimonials";

import { collections } from "./utils/data";

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
