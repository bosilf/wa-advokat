import ImageComponent from "@/components/common/Image";
import Link from "next/link";
import type { EmployeeCardProps } from "./EmployeeCard";

export type CourseLecturerCardType = {
  hoverEffect?: boolean;
  hide?: boolean;
  e: EmployeeCardProps;
};

const CourseLecturerCard = ({
  hoverEffect = false,
  hide,
  e,
}: CourseLecturerCardType) => {
  return (
    <Link
      href={e.employee.slug ? `/team/${e.employee.slug}` : "/om-oss"}
    >
      <article
        hidden={hide}
        className="w-full max-h-25 min-h-15 grid grid-cols-[auto_1fr] gap-3 lg:gap-3 p-sm pr-md -mx-sm rounded-md transition-all duration-200 "
      >
        <div className="size-13 my-auto overflow-hidden rounded-full">
          <ImageComponent image={e.employee.image} sizes="56px" />
        </div>
        <div className="flex flex-col justify-center gap-xs">
          <p
            className={`font-eyebrow -mb-2 transition-all capitalize duration-200
          `}
          >kursledare
          </p>
          <h3
            className={`font-bold text-normal  transition-all duration-200 
          `}
          >
            {e.employee.firstName} {e.employee.lastName}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default CourseLecturerCard;
