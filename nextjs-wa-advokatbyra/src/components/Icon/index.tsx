import { FaArrowRight, FaCheck } from "react-icons/fa";
import { IoIosArrowDown, IoMdBook, IoMdLaptop } from "react-icons/io";
import { RiArrowLeftLongFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { FaLaptopHouse } from "react-icons/fa";
import { BsHouseCheck } from "react-icons/bs";
import { IoPricetagOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { IoMdShare } from "react-icons/io";

const iconList = {
  arrow: FaArrowRight,
  arrowSimple: IoIosArrowDown,
  check: FaCheck,
  arrowSerifLeft: RiArrowLeftLongFill,
  location: IoLocationOutline,
  house: BsHouseCheck,
  laptopHouse: FaLaptopHouse,
  pricetag: IoPricetagOutline,
  calendar: FaRegCalendarCheck,
  heartEmpty: IoMdHeartEmpty,
  heart: IoMdHeart,
  share: IoMdShare,
  laptop: IoMdLaptop,
  book: IoMdBook,
} as const;

export type IconsProps = {
  name: keyof typeof iconList | string;
  size?: number | string;
  className?: string;
};

export default function Icon({
  name,
  size = 24,
  className = "text-ink",
}: IconsProps) {
  const IconComponent = iconList[name as keyof typeof iconList] || null;

  return (
    <figure className="inline-grid place-items-center w-auto h-full">
      <IconComponent size={size} className={className} />
    </figure>
  );
}
