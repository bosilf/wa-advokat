import { FaArrowRight, FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowLeftLongFill } from "react-icons/ri";


const iconList = {
  arrow: FaArrowRight,
  arrowSimple: IoIosArrowDown,
  check: FaCheck,
  arrowSerifLeft: RiArrowLeftLongFill,
} as const;

export type IconsProps = {
  name: keyof typeof iconList | string,
  size?: number | string,
  className?: string
}

export default function Icon({ name, size = 24, className = "text-ink" }: IconsProps) {
  const IconComponent = iconList[name as keyof typeof iconList] || null;

  return (
    <figure className="inline-grid place-items-center w-auto h-full">
      <IconComponent size={size} className={className} />
    </figure>
  )
}