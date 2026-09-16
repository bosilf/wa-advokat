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
        grid h-fit grid-cols-4 gap-lg mt-md
        md:grid-cols-3
      "
    >
      {children}
    </ul>
  );
}