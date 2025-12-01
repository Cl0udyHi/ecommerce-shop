import heroBanner from "@/public/images/Banner.png";
import Image from "next/image";
import TestimonialsContainer from "@/components/Testimonials";
import { fetchCollections } from "@/hooks/shopify/useCollections";
import Collection from "@/app/components/collections-section/collection";
import type { Collection as CollectionType } from "@/utils/types";

export default async function Home() {
  const collections = await fetchCollections();

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

      {collections.map(
        (collection: CollectionType, index: number) =>
          collection.products.length > 0 && (
            <Collection key={index} collection={collection} />
          )
      )}

      <TestimonialsContainer className="sm:px-16 px-8" />
    </div>
  );
}
