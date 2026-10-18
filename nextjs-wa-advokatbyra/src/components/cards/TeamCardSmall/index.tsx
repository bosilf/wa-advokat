import ImageComponent, { ImageCompProps } from "@/components/common/Image";
import Link from "next/link";

export type TeamCardSmallType = {
  hoverEffect?: boolean;
  hide?: boolean;
  name?: string;
  link?: string;
  caption?: string[] | string;
  image?: ImageCompProps["image"];
};

const TeamCardSmall = ({
  hoverEffect = false,
  hide,
  name,
  caption,
  image,
  link,
}: TeamCardSmallType) => {
  return (
    <Link className="group w-fit" href={link || "#"}>
      <article
        hidden={hide}
        className="bg-white min-w-fit w-60 max-h-20 grid grid-cols-[auto_1fr] gap-sm lg:gap-3 p-sm pr-md rounded-xl transition-all duration-200 drop-shadow-lg/0 group-hover:drop-shadow-lg/20"
      >
        <div className="my-auto size-14 shrink-0 overflow-hidden rounded-full">
          <ImageComponent image={image} sizes="56px" aspectRatio={1} />
        </div>
        <div className="flex flex-col justify-center gap-xs">
          <h3
            className={`font-bold text-normal  transition-all duration-200 
          ${
            hoverEffect
              ? "text-ink/0 group-hover:text-ink"
              : "text-ink group-hover:text-footer"
          }
          `}
          >
            {name}
          </h3>
          <p
            className={`font-caption transition-all capitalize duration-200
          ${
            hoverEffect
              ? "text-body/0 group-hover:text-body"
              : "text-body group-hover:text-accent"
          }
          `}
          >
            {Array.isArray(caption) ? caption.join(" | ") : caption}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default TeamCardSmall;