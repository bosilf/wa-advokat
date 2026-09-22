import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/image";

import type { NavigationItems } from "../../headers/navs/NavItems";

type NavigationItem = NavigationItems[number];

type EmployeeNavItem = NonNullable<
  NavigationItem["dropdownItems"]
>[number];

type EmployeeNavCardProps = {
  employee: EmployeeNavItem;
  isActive: boolean;
  onNavigate?: () => void;
};

export default function EmployeeNavCard({
  employee,
  isActive,
  onNavigate,
}: EmployeeNavCardProps) {
  
  if (!("firstName" in employee)) {
    return null;
  }
  
  const name =
    employee.title ??
    [employee.firstName, employee.lastName]
      .filter(Boolean)
      .join(" ");

  const initials = [
    employee.firstName?.charAt(0),
    employee.lastName?.charAt(0),
  ]
    .filter(Boolean)
    .join("");

  const imageUrl = employee.image
    ? urlFor(employee.image)
        .width(200)
        .height(200)
        .fit("crop")
        .url()
    : null;

  const jobTitles =
    employee.jobTitles
      ?.filter(
        (title): title is string =>
          Boolean(title),
      )
      .join(" | ") ?? "";

  return (
    <Link
      href={employee.href ?? "#"}
      tabIndex={isActive ? undefined : -1}
      onClick={onNavigate}
      className="grid aspect-5/1 grid-cols-[auto_1fr] h-fit gap-3  p-sm hover:bg-canvas rounded-md overflow-hidden transition-colors
      "
    >
      <div className="rounded-full relative aspect-square overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 124px) 40px, 40vw"
            className="
              object-cover
              h-fit
              transition-transform duration-500
              group-hover/card:scale-105 aspect-square
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-h3 text-white">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="font-sans text-lg font-semibold text-ink">
          {name}
        </p>

        {jobTitles && (
          <p className="font-caption capitalize">
            {jobTitles}
          </p>
        )}
      </div>
    </Link>
  );
}