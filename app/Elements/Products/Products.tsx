"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";

import { collections } from "@/app/utils/data";
import Product from "./components/Product";
import { calcWidth } from "../../utils/CalcWidth";
import classNames from "classnames";

const Products = () => {
  const parent: RefObject<HTMLDivElement | null> = useRef(null);

  const [childWidth, setChildWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setChildWidth(
        calcWidth({
          container: parent.current,
          colsSize: { base: 1, sm: 2, lg: 3 },
          gap: 16,
        })
      );
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    if (parent.current) {
      resizeObserver.observe(parent.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div id="Products" className="w-full flex flex-col gap-8">
      {collections.map((collection, index) => (
        <div
          key={index}
          className={classNames(
            "w-full flex flex-col gap-4 text-text text-xl font-bold"
          )}
        >
          <div className="w-full">
            <h1 className="sm:mx-16 mx-8 font-bold text-[1.75rem]">
              {collection.name}
            </h1>
            <div ref={parent} className="sm:mx-16 mx-8 overflow-hidden"></div>
          </div>
          <div
            className={classNames(
              "w-full overflow-scroll overflow-y-hidden snap-always scroll-smooth sm:scroll-px-16 scroll-px-8 scrollbar-invisible snap-x snap-mandatory",
              "sm:w-auto sm:overflow-visible sm:scroll-auto sm:scrollbar-auto sm:snap-none"
            )}
          >
            <div
              className={classNames(
                "w-max flex gap-4 sm:px-16 px-8",
                "sm:w-full lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-x-4 gap-y-8"
              )}
            >
              {collection.products.map((product, index) => (
                <Product
                  name={product.name}
                  width={childWidth}
                  id={product.id}
                  price={product.price}
                  key={index}
                  colors={product.colors}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
