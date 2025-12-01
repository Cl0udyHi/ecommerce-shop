import type { Collection } from "@/utils/types";
import classNames from "classnames";
import Product from "./product";
import Slider from "../../../components/slider/Slider";

export default function Collection({ collection }: { collection: Collection }) {
  // const scrollContainer = useRef(null);

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"w-full flex justify-between items-center sm:px-16 px-8"}>
        <h1 className="col-start-1 row-start-1 font-bold text-[1.75rem]">
          {collection.title}
        </h1>
        {/* <Arrows className="lg:hidden" scrollContainerRef={scrollContainer} /> */}
      </div>

      <Slider
        // scrollContainerRef={scrollContainer}
        invisibleScrollbar
        className={classNames(
          "sm:px-16 px-8",
          "lg:w-full lg:grid-cols-3 2xl:grid-cols-4 lg:grid gap-x-4 gap-y-8",
          "lg:overflow-visible lg:scroll-auto lg:scrollbar-auto lg:snap-none"
        )}
      >
        {collection.products.map((product: any, index: number) => (
          <Product key={index} product={product} />
        ))}
      </Slider>
    </div>
  );
}
