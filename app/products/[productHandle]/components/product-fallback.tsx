import Button from "@/components/Button";
import classNames from "classnames";
import Link from "next/link";

export function ProductError({ message }: { message: string }) {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1>{message}</h1>
      <Link href="/">
        <Button>Label</Button>
      </Link>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="min-h-screen flex flex-col gap-8 mb-16 mt-px">
      <div
        className={classNames(
          "grid grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-8",
          "sm:px-16 sm:grid sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-4 sm:gap-y-8",
          "xl:grid-cols-3 xl:grid-rows-[auto_auto_auto]"
        )}
      >
        {/* Images */}
        <div
          className={classNames(
            "w-full aspect-square object-cover bg-natural-300 animate-pulse",
            "sm:rounded-lg",
            "md:row-start-1 md:col-start-1"
          )}
        />

        <div
          className={classNames(
            "px-8 row-start-3 grid grid-cols-4 grid-rows-1 gap-4",
            "sm:col-start-1 sm:row-start-3 sm:px-0",
            "xl:col-start-2 xl:row-start-1 xl:grid-cols-2 xl:grid-rows-2"
          )}
        >
          {Array.from({ length: 4 }).map((image, index) => (
            <div
              key={index}
              className={classNames(
                "w-full aspect-square object-cover rounded bg-natural-300 animate-pulse"
              )}
            />
          ))}
        </div>

        {/* Name / Price */}
        <div
          className={classNames(
            "row-start-2 px-8 flex flex-col gap-1",
            "sm:col-span-2 sm:row-start-2 sm:px-0"
          )}
        >
          <div className="h-8 w-2/4 rounded-sm bg-natural-300 animate-pulse" />
          <div className="row-start-2 col-span-2 flex gap-1 items-center">
            <div className="h-5 w-1/6 rounded-sm bg-natural-300 animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <div
          className={classNames(
            "row-start-4 px-8 flex flex-col gap-2",
            "sm:col-span-2 sm:row-start-4 sm:px-0",
            "xl:row-start-3"
          )}
        >
          <div className="h-7 w-2/4 rounded-sm bg-natural-300 animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="h-6 w-3/4 rounded-sm bg-natural-300 animate-pulse" />
            <div className="h-6 w-4/4 rounded-sm bg-natural-300 animate-pulse" />
            <div className="h-6 w-1/4 rounded-sm bg-natural-300 animate-pulse" />
            <div className="h-6 w-3/4 rounded-sm bg-natural-300 animate-pulse" />
          </div>
        </div>

        {/* Select Options */}
        <form
          className={classNames(
            "px-8 flex flex-col gap-4",
            "sm:col-start-2 sm:row-start-1 sm:px-0",
            "xl:col-start-3"
          )}
          method="get"
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <fieldset key={index} className="space-y-2">
              <legend className="w-2/4 h-6 rounded-sm bg-natural-300 animate-pulse" />

              <div
                className={classNames(
                  "grid grid-cols-3 gap-1",
                  "lg:grid-cols-4"
                )}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <label key={index} className="block">
                    <div className="block rounded py-3 h-11 bg-natural-300 animate-pulse" />
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className={classNames("flex gap-2", "sm:mt-auto")}>
            <div className="w-19 h-10 p-2 rounded bg-natural-300 animate-pulse" />
            <div
              className={classNames(
                "w-full h-10 bg-natural-300 animate-pulse rounded"
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
