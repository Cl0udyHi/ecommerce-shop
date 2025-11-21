import heroBanner from "@/public/images/Banner.png";
import Image from "next/image";
import Collections from "@/components/collections/Collections";
import TestimonialsContainer from "@/components/Testimonials";

export default async function Home() {
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

      {/* <ProductsList /> */}

      <Collections />

      <TestimonialsContainer className="sm:px-16 px-8" />
    </div>
  );
}
