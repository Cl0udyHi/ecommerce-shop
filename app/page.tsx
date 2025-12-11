import heroBanner from "@/public/images/Banner.png";
import Image from "next/image";
import TestimonialsContainer from "@/app/components/Testimonials";
import CollectionsSection from "./components/collections-section/collections-section";
import { Suspense } from "react";
import CollectionsSkeleton from "./components/collections-section/collections-fallback";
import classNames from "classnames";

export default async function Home() {
  return (
    <div className="w-full flex flex-col gap-16 pb-16 bg-natural-100">
      <div className="xl:px-16">
        <Image
          className={classNames(
            "w-full h-130 object-cover",
            "xl:h-auto xl:rounded-lg"
          )}
          src={heroBanner}
          placeholder="blur"
          alt="Banner"
        />
      </div>

      <Suspense fallback={<CollectionsSkeleton />}>
        <CollectionsSection />
      </Suspense>

      <TestimonialsContainer className="sm:px-16 px-8" />
    </div>
  );
}
