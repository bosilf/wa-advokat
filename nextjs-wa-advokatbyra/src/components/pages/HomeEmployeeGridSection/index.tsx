"use client";

import type { ReactNode } from "react";

export type HomeEmployeeGridSectionProps = {
  children?: ReactNode;
};

export default function HomeEmployeeGridSection({
  children,
}: HomeEmployeeGridSectionProps) {

  return (
    <ul
      className="
        grid h-fit grid-cols-4 my-25 gap-x-0 gap-y-30 mt-20 lg:gap-y-md lg:gap-x-lg lg:my-lg
        md:grid-cols-2 md:gap-x-lg md:gap-y-lg md:mx-20 lg:grid-cols-4 lg:-mx-30
      "
    >
      {children}
    </ul>
  );
}