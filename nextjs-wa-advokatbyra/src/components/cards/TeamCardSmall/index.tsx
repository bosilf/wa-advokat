import ImageComponent from "@/components/common/Image"
import Link from "next/link";

export type TeamCardSmallType = {
  hoverEffect?: boolean,
  hide?: boolean,
  name?: string,
  link?: string,
  caption?: string[] | string,
  image?: {
    alt?: string | null;
    hotspot?: {
      x?: number;
      y?: number;
    } | null;
  } | null;
}


const TeamCardSmall = ({hoverEffect = false, hide, name, caption, image, link}: TeamCardSmallType) => {
  return (
    <Link className="group" href={link || '#'}>
    <article hidden={hide} className="aspect-5/1 w-full max-h-20 grid grid-cols-[auto_1fr] gap-sm lg:gap-3 p-sm pr-md -mx-sm rounded-md transition-all duration-200 group-hover:bg-surface">
      <div className="aspect-square h-full my-auto w-full overflow-hidden rounded-full" >
        {hoverEffect 
          ? <ImageComponent image={image} />
          : <ImageComponent image={image} />
        }
        
      </div>
      <div className="flex flex-col justify-center gap-xs">
        <h3 className={`font-bold text-normal  transition-all duration-200 
          ${
            hoverEffect ? "text-ink/0 group-hover:text-ink" : "text-ink group-hover:text-footer"
          }
          `}>{name}</h3>
        <p className={`font-caption transition-all capitalize duration-200
          ${
            hoverEffect ? "text-body/0 group-hover:text-body" : "text-body group-hover:text-accent"
          }
          `}>{caption}</p>
      </div>
    </article>
    </Link>
  )
}

export default TeamCardSmall