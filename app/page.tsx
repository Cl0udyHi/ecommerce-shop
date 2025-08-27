"use cache";

import heroBanner from "@/public/images/Banner.png";
import Image from "next/image";
import Collections from "./Elements/Collections/Collections";
import TestimonialsContainer from "./Elements/Testimonials/Testimonials";
import { getCollections } from "@/lib/shopify";

export default async function Home() {
  const collections = await getCollections();

  if (!collections) return;

  return (
    <div className="w-full flex flex-col gap-16 py-16 bg-natural-100">
      <div className="sm:block hidden sm:px-16 px-8 -mt-16" id="Home">
        <Image
          className="w-full rounded-lg object-cover"
          src={heroBanner}
          placeholder="blur"
          alt="Banner"
        />
      </div>

      <Collections collections={collections} />

      <TestimonialsContainer className="sm:px-16 px-8" />
    </div>
  );
}
