import Icon from "@/components/Icon";
import Link from "next/link";

export type ArticleCardProps = {
  title: string;
  lead: string;
  link: string;
  image?: string;
}

export default function ArticleCard({ title, lead, link, image }: ArticleCardProps) {
  return (
    <article className="bg-accent mx-0 rounded-md p-md aspect-3/4 overflow-hidden w-full flex flex-col">
      <h4 className="font-subheading text-ink">{title}</h4>
      <p className="flex-1 font-body text-ink overflow-hidden text-ellipsis">{lead}</p>
      <Link aria-label={title} href={link} className="bg-white/30 aspect-square rounded-full p-sm inline-flex justify-center h-fit w-fit">
        <Icon name="arrow" className="text-ink w-md m-auto" />
      </Link>
    </article>
  )
}