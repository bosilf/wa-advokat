import HeroEmployeeDesk from "../HeroEmployeeDesk";
import HeroEmployeeMobile from "../HeroEmployeeMobile";

export type HeroEmployeeProps = {
  employee: {
    firstName: string;
    lastName: string;
    roles: string;
    email: string;
    phone: string;
  };
  image?: {
    alt?: string | null;
    hotspot?: {
      x?: number;
      y?: number;
    } | null;
  } | null;
  title?: string | null;
  eyebrow?: string | null;
}

export default function HeroEmployee({employee, title, eyebrow, image }: HeroEmployeeProps) {

  return (
    <>
      <div className="block md:hidden">
        <HeroEmployeeMobile employee={employee} image={image} title={title} eyebrow={eyebrow} />
      </div>
      <div className="hidden md:block">
        <HeroEmployeeDesk employee={employee} image={image} eyebrow={eyebrow} title={title} />
      </div>
    </>
  )
}