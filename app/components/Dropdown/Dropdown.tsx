"use client";

import classNames from "classnames";
import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import { useOnClickOutside } from "usehooks-ts";

const Dropdown = ({
  children,
  open = false,
  setOpen,
  selected = 0,
  setSelected,
}: {
  children: [
    ReactElement<{ onClick?: () => void }>,
    ReactElement<HTMLUListElement>,
  ];
  defaultSelected?: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  const [Button, list] = children;

  const listItems = React.Children.toArray(
    list.props.children as ReactNode | ReactNode[]
  );

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

  return (
    <div ref={ref} className="relative flex flex-col items-end gap-1">
      {React.cloneElement(Button, {
        onClick: () => setOpen(!open),
      })}
      <div
        className={classNames(
          "absolute top-[calc(100%+0.25rem)] w-max flex flex-col justify-end bg-natural-300 rounded-sm transition-[height] overflow-hidden",
          { "h-0 pointer-events-none": open == false }
        )}
      >
        <ul>
          {listItems.map((item, index) => {
            if (!React.isValidElement(item)) return null;

            const li = item as React.ReactElement<{
              children: React.ReactNode;
            }>;
            const content = li.props.children;

            return (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelected(index);
                    setOpen(false);
                  }}
                  className={classNames(
                    "flex w-full justify-between gap-4 items-center px-4 py-2 hover:bg-natural-400 cursor-pointer text-base text-natural-700",
                    { "bg-natural-400": selected === index }
                  )}
                >
                  {content}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
