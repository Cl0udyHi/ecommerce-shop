import classNames from "classnames";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Button({ className, children }: Props) {
  return (
    <button
      className={classNames(
        "col-start-2 ml-auto w-max row-start-1 px-4 py-2 font-semibold transition-colors duration-100 rounded-sm cursor-pointer bg-natural-200 hover:bg-natural-300",
        className
      )}
    >
      {children}
    </button>
  );
}
