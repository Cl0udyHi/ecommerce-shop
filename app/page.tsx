import heroBanner from "@/public/images/Banner.png";
import Product from "./Elements/Products/components/Product";
import Image from "next/image";
import Testomonials from "./Elements/Testimonials/Testimonials";
import Products from "./Elements/Products/Products";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-16 py-8 bg-natural-100">
      <div className="sm:block hidden sm:px-16 px-8" id="Home">
        <Image
          className="w-full rounded-lg object-cover"
          src={heroBanner}
          placeholder="blur"
          alt="Banner"
        />
      </div>

      <Products />

      <Testomonials />
    </div>
  );
}
