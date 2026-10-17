import Link from "next/link";
import Icon from "../Icon";

export default function ScrollerEndCard() {
  return (
    <div className="flex flex-col gap-3 min-w-40 items-center justify-center p-6">
      <Link href="/artiklar" className="flex flex-col gap-4 group">
        <p className="text-ink group-hover:text-accent transition-all duration-150 font-subheading h-fit text-center">
          Se alla våra artiklar
        </p>
        <Icon
          name="arrow"
          size=""
          className="bg-white drop-shadow-xs/0 transition-all group-hover:text-accent duration-250 group-hover:drop-shadow-lg p-3 mb-auto rounded-full text-ink size-10"
        />
      </Link>
    </div>
  );
}
