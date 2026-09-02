import type { ComponentProps } from "react";

import EmployeeCard from "@/components/cards/EmployeeCard";

type Employee = ComponentProps<
  typeof EmployeeCard
>["employee"];

export type EmployeeGridBlockData = {
  _key: string;
  _type: "employeeGridBlock";
  employees?: Employee[] | null;
};

type EmployeeGridBlockProps = {
  block: EmployeeGridBlockData;
};

export default function EmployeeGridBlock({
  block,
}: EmployeeGridBlockProps) {
  const employees = block.employees ?? [];

  if (employees.length === 0) {
    return (
      <p className="font-body text-muted">
        Inga medarbetare har valts.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-md md:grid-cols-3">
      {employees.map((employee) => (
        <li key={employee._id}>
          <EmployeeCard employee={employee} />
        </li>
      ))}
    </ul>
  );
}